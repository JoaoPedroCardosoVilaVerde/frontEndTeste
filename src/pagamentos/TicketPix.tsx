import React, { useState } from 'react';
import './TicketPix.css';

function TicketPix() {
  const [paymentData, setPaymentData] = useState({
    amount: 29000,
    paymentMethod: 'Crédito', // Começa com Crédito por padrão
    cardNumber: '**** 4292',
    cvv: '',
    installments: 1, // Número de parcelas para crédito
    isPaymentProcessing: false,
    isPaymentSuccess: false,
    errorMessage: '',
    showPaymentOptions: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handlePayment = () => {
    setPaymentData({ ...paymentData, isPaymentProcessing: true });

    // Aqui seria a integração com a API do Mercado Pago.
    // Vamos simular um sucesso de pagamento com um delay.
    setTimeout(() => {
      setPaymentData({
        ...paymentData,
        isPaymentProcessing: false,
        isPaymentSuccess: true,
        errorMessage: '',
      });
    }, 2000);
  };

  const handleInstallmentChange = (event) => {
    const { value } = event.target;
    setPaymentData({ ...paymentData, installments: parseInt(value) });
  };

  const handlePaymentMethodChange = (event) => {
    const { value } = event.target;
    setPaymentData({ ...paymentData, paymentMethod: value });
  };

  const handleAlterPayment = () => {
    setPaymentData({ ...paymentData, showPaymentOptions: true });
  };

  const handleConfirmPayment = () => {
    setPaymentData({ ...paymentData, showPaymentOptions: false });
  };

  const availablePaymentMethods = [
    { label: 'Crédito', value: 'Crédito', installments: true },
    { label: 'Débito', value: 'Débito', installments: false },
    { label: 'Pix', value: 'Pix', installments: false },
    { label: 'Boleto', value: 'Boleto', installments: false },
  ];

  const availableInstallments = [
    { label: '1x', value: 1 },
    { label: '2x', value: 2 },
    { label: '3x', value: 3 },
    { label: '4x', value: 4 },
    { label: '5x', value: 5 },
    { label: '6x', value: 6 },
    { label: '12x', value: 12 },
  ];

  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo.png" alt="Mercado Pago" />
        </div>
        <div className="user">
          Cliente Fulano A
        </div>
      </header>
      <main className="main">
        <div className="payment-info">
          <h2>Valor do plano escolhido</h2>
          {paymentData.paymentMethod === 'Crédito' && (
            <div className="amount">{paymentData.installments}x R$ {((paymentData.amount / 100) / paymentData.installments).toFixed(2)}</div>
          )}
          {['Débito', 'Pix', 'Boleto'].includes(paymentData.paymentMethod) && (
            <div className="amount">R$ {(paymentData.amount / 100).toFixed(2)}</div>
          )}
        </div>
        <div className="review">
          <h3>Revisão da sua assinatura</h3>
          <p>Plano familia</p>
        </div>
        <div className="payment-method">
          <div className="method">
            {!paymentData.showPaymentOptions && (
              <>
                {/* Renderiza a imagem apropriada para o método */}
                {/* Utilize condições para escolher a imagem adequada */}
                <img src={`https://i.imgur.com/${paymentData.paymentMethod === 'Crédito' ? '/assets/cartão.png' : paymentData.paymentMethod === 'Débito' ? '/assets/cartão.png' : paymentData.paymentMethod === 'Pix' ? '/assets/pix.png' : '/assets/boleto.png'}.png`} alt={paymentData.paymentMethod} />
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
            {paymentData.showPaymentOptions && (
              <div className="payment-selector">
                <select value={paymentData.paymentMethod} onChange={handlePaymentMethodChange}>
                  {availablePaymentMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </select>
                {/* Renderiza a imagem apropriada para o método selecionado */}
                <img src={`https://i.imgur.com/${paymentData.paymentMethod === 'Crédito' ? '/assets/cartão.png' : paymentData.paymentMethod === 'Débito' ? '/assets/cartão.png' : paymentData.paymentMethod === 'Pix' ? '/assets/pix.png' : '/assets/boleto.png'}.png`} alt={paymentData.paymentMethod} />
              </div>
            )}
          </div>
          <div className="installments-selector">
            {paymentData.showPaymentOptions && paymentData.paymentMethod === 'Crédito' && (
              <select value={paymentData.installments} onChange={handleInstallmentChange}>
                {availableInstallments.map((installment) => (
                  <option key={installment.value} value={installment.value}>
                    {installment.label}
                  </option>
                ))}
              </select>
            )}
          </div>
          {!paymentData.showPaymentOptions && (
            <button className="alter-button" onClick={handleAlterPayment}>
              <span className="alter-icon">🗖</span> <span>Alterar</span>
            </button>
          )}
          {paymentData.showPaymentOptions && (
            <>
              <button className="confirm-button" onClick={handleConfirmPayment}>
                Confirmar
              </button>
            </>
          )}
        </div>
        <div className="amount-to-pay">
          {/* Mostrar somente se Crédito */}
          {paymentData.paymentMethod === 'Crédito' && (
            <p>Você pagará R$ {paymentData.amount / 100}</p>
          )}
        </div>
        {/* Mostrar a entrada do código apenas para Crédito e Débito */}
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
        <button className="pay-button" disabled={paymentData.isPaymentProcessing} onClick={handlePayment}>
          {paymentData.isPaymentProcessing ? 'Processando...' : 'Pagar'}
        </button>
        {paymentData.isPaymentSuccess && (
          <div className="success-message">
            <p>Pagamento realizado com sucesso!</p>
          </div>
        )}
        {paymentData.errorMessage && (
          <div className="error-message">
            <p>{paymentData.errorMessage}</p>
          </div>
        )}
        <p className="security">
          <img src="https://w7.pngwing.com/pngs/910/479/png-transparent-padlock-key-computer-icons-key-area-symbol-security.png" alt="Security Lock" /> Pagamento seguro
        </p>
      </main>
    </div>
  );
}

export default TicketPix;