import React, { useState } from 'react';
import './TicketPix.css'; // Importa o arquivo de estilos CSS

function TicketPix() {
  // Define o estado do componente com dados de pagamento
  const [paymentData, setPaymentData] = useState({
    amount: 29000, // Valor total do pagamento em centavos
    paymentMethod: 'Crédito', // Método de pagamento inicial
    cardNumber: '**** 4292', // Últimos 4 dígitos do cartão (apenas para exibição)
    cvv: '', 
    installments: 1, // Número de parcelas para crédito 
    isPaymentProcessing: false, // Indica se o pagamento está sendo processado
    isPaymentSuccess: false, // Indica se o pagamento foi realizado com sucesso
    errorMessage: '', 
    showPaymentOptions: false, // Indica se as opções de pagamento estão visíveis
  });

  // Função para lidar com a alteração de campos de entrada
  const handleChange = (event) => {
    const { name, value } = event.target; // Obtém o nome e valor do campo
    setPaymentData({ ...paymentData, [name]: value }); // Atualiza o estado com o novo valor
  };

  // Função para iniciar o processo de pagamento
  const handlePayment = () => {
    setPaymentData({ ...paymentData, isPaymentProcessing: true }); // Define o estado de processamento como true

    // Simulação da API de pagamento.
    // Vamos simular um sucesso de pagamento com um delay.
    setTimeout(() => {
      setPaymentData({
        ...paymentData,
        isPaymentProcessing: false, // Define o estado de processamento como false
        isPaymentSuccess: true, // Define o estado de sucesso como true
        errorMessage: '', // Limpa a mensagem de erro
      });
    }, 2000); // Simula um delay de processamento 2 segundos
  };

  // Função para lidar com a alteração do número de parcelas
  const handleInstallmentChange = (event) => {
    const { value } = event.target; // Obtém o valor da parcela selecionada
    setPaymentData({ ...paymentData, installments: parseInt(value) }); // Atualiza o estado com o número de parcelas
  };

  // Função para lidar com a alteração do método de pagamento
  const handlePaymentMethodChange = (event) => {
    const { value } = event.target; // Obtém o valor do método de pagamento selecionado
    setPaymentData({ ...paymentData, paymentMethod: value }); // Atualiza o estado com o método de pagamento
  };

  // Função para exibir as opções de pagamento
  const handleAlterPayment = () => {
    setPaymentData({ ...paymentData, showPaymentOptions: true }); // Define o estado de exibição de opções como true
  };

  // Função para confirmar a seleção de pagamento
  const handleConfirmPayment = () => {
    setPaymentData({ ...paymentData, showPaymentOptions: false }); // Define o estado de exibição de opções como false
  };

  // Array com os métodos de pagamento disponíveis
  const availablePaymentMethods = [
    { label: 'Crédito', value: 'Crédito', installments: true }, // Métodos de pagamento com opções de parcelamento
    { label: 'Débito', value: 'Débito', installments: false },
    { label: 'Pix', value: 'Pix', installments: false },
    { label: 'Boleto', value: 'Boleto', installments: false },
  ];

  // Array com as opções de parcelamento disponíveis
  const availableInstallments = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
    { label: '4x', value: 4 },
    { label: '5x', value: 5 },
    { label: '6x', value: 6 },
    { label: '12x', value: 12 },
  ];

  // Função para obter a imagem do método de pagamento
  const getImageURL = (paymentMethod) => {
    switch (paymentMethod) {
      case 'Crédito':
      case 'Débito':
        return 'https://cdn-icons-png.flaticon.com/512/755/755718.png'; // URL do crédito
      case 'Pix':
        return 'https://img.icons8.com/fluent/512/pix.png'; // URL do Pix
      case 'Boleto':
        return 'https://cdn0.iconfinder.com/data/icons/50-payment-system-icons-2/480/Boleto.png'; // URL do Boleto
      default:
        return null; // Retorna null para casos inválidos
    }
  };

  return (
    <div className="container">
      {/* Cabeçalho do componente */}
      <header className="header">
        <div className="logo">
          <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" />
        </div>
        <div className="user">
          Cliente Fulano A
        </div>
      </header>
      <main className="main">
        {/* Informações de pagamento */}
        <div className="payment-info">
          <h2>Valor do plano escolhido</h2>
          {paymentData.paymentMethod === 'Crédito' && (
            <div className="amount">{paymentData.installments}x R$ {((paymentData.amount / 100) / paymentData.installments).toFixed(2)}</div>
          )}
          {['Débito', 'Pix', 'Boleto'].includes(paymentData.paymentMethod) && (
            <div className="amount">R$ {(paymentData.amount / 100).toFixed(2)}</div>
          )}
        </div>
        {/* Revisão da assinatura */}
        <div className="review">
          <h3>Revisão da sua assinatura</h3>
          <p>Plano familia</p>
        </div>
        {/* Seção de seleção de método de pagamento */}
        <div className="payment-method">
          <div className="method">
            {/* Exibe o método de pagamento atual se as opções não estiverem visíveis */}
            {!paymentData.showPaymentOptions && (
              <>
                {getImageURL(paymentData.paymentMethod) && ( // Renderiza a imagem do método caso a URL for válida
                  <img src={getImageURL(paymentData.paymentMethod)} alt={paymentData.paymentMethod} />
                )}
                <p>
                  {paymentData.paymentMethod}
                  {paymentData.paymentMethod === 'Crédito' && (
                    <>
                      **** {paymentData.cardNumber.slice(-4)}
                      <br />
                      Mastercard Crédito
                    </>
                  )}
                </p>
              </>
            )}
            {/* Exibe o seletor de método de pagamento se as opções estiverem visíveis, o apertar de botão ALTERAR para esconder e aparecer os métodos */}
            {paymentData.showPaymentOptions && (
              <div className="payment-selector">
                <select value={paymentData.paymentMethod} onChange={handlePaymentMethodChange}>
                  {/* Renderiza as opções de método de pagamento disponíveis */}
                  {availablePaymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
                {/* Renderiza a imagem do método selecionado se a URL for válida */}
                {getImageURL(paymentData.paymentMethod) && (
                  <img src={getImageURL(paymentData.paymentMethod)} alt={paymentData.paymentMethod} />
                )}
              </div>
            )}
          </div>
          {/* Seção de seleção de parcelamento */}
          <div className="installments-selector">
            {/* Exibe o seletor de parcelas se as opções estiverem visíveis e o método for crédito */}
            {paymentData.showPaymentOptions && paymentData.paymentMethod === 'Crédito' && (
              <select value={paymentData.installments} onChange={handleInstallmentChange}>
                {/* Renderiza as opções de parcelamento disponíveis */}
                {availableInstallments.map((installment) => (
                  <option key={installment.value} value={installment.value}>
                    {installment.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          {/* Botão para alterar o método de pagamento */}
          {!paymentData.showPaymentOptions && (
            <button className="alter-button" onClick={handleAlterPayment}>
              <span className="alter-icon">🗖</span> <span>Alterar</span>
            </button>
          )}
          {/* Botão para confirmar o método de pagamento selecionado */}
          {paymentData.showPaymentOptions && (
            <>
              <button className="confirm-button" onClick={handleConfirmPayment}>
                Confirmar
              </button>
            </>
          )}
        </div>
        {/* Exibe o valor total a pagar se o método for crédito */}
        <div className="amount-to-pay">
          {paymentData.paymentMethod === 'Crédito' && (
            <p>Você pagará R$ {paymentData.amount / 100}</p>
          )}
        </div>
        {/* Exibe o campo para o código de segurança se o método for crédito ou débito */}
        {['Crédito', 'Débito'].includes(paymentData.paymentMethod) && (
          <div className="security-code">
            <img src="https://w7.pngwing.com/pngs/85/626/png-transparent-card-security-code-credit-card-computer-icons-payoneer-credit-card-text-rectangle-logo.png" alt="Security Code" />
            <input
              type="password"
              name="cvv"
              placeholder="Código de segurança"
              value={paymentData.cvv}
              onChange={handleChange}
            />
          </div>
        )}
        {/* Botão para iniciar o pagamento */}
        <button className="pay-button" disabled={paymentData.isPaymentProcessing} onClick={handlePayment}>
          {paymentData.isPaymentProcessing ? 'Processando...' : 'Pagar'}
        </button>
        {/* Mensagem de sucesso do pagamento */}
        {paymentData.isPaymentSuccess && (
          <div className="success-message">
            <p>Pagamento realizado com sucesso!</p>
          </div>
        )}
        {/* Mensagem de erro do pagamento */}
        {paymentData.errorMessage && (
          <div className="error-message">
            <p>{paymentData.errorMessage}</p>
          </div>
        )}
        {/* Ícone da indicação de certificado de segurança do mercado pago */}
        <p className="security">
          <img src="https://w7.pngwing.com/pngs/910/479/png-transparent-padlock-key-computer-icons-key-area-symbol-security.png" alt="Security Lock" /> Pagamento seguro
        </p>
      </main>
    </div>
  );
}

export default TicketPix;