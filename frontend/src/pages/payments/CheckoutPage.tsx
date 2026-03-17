import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [saveCard, setSaveCard] = useState(true);

  const sessionDetails = {
    expertName: 'Dr. Sarah Jenkins',
    expertImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    date: 'Oct 24, 2023',
    time: '10:00 AM',
    duration: 60,
    fee: 80.00,
    serviceFee: 5.00,
    total: 85.00
  };

  return (
    <div className="flex-1">
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Secure Checkout</h1>
          <p className="text-slate-500">Confirm your mental wellness session and complete the booking.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <h3 className="text-lg font-bold p-6 border-b border-slate-100 dark:border-slate-700">
                Order Summary
              </h3>
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="w-full md:w-40 h-28 rounded-lg overflow-hidden">
                    <img
                      src={sessionDetails.expertImage}
                      alt={sessionDetails.expertName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary/10 text-primary text-xs font-bold uppercase px-2 py-0.5 rounded">
                        Mental Wellness
                      </span>
                    </div>
                    <p className="text-xl font-bold mb-2">{sessionDetails.expertName}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">calendar_today</span>
                        <span>{sessionDetails.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        <span>{sessionDetails.time} ({sessionDetails.duration} min)</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                    Change
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-lg font-bold mb-4">Payment Method</h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {[
                  { id: 'card', label: 'Card', icon: 'credit_card' },
                  { id: 'paypal', label: 'PayPal', icon: 'account_balance_wallet' },
                  { id: 'apple', label: 'Apple Pay', icon: 'ios' }
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                      }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-2xl mb-1">{method.icon}</span>
                    <span className="text-xs font-bold uppercase">{method.label}</span>
                    {paymentMethod === method.id && (
                      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[12px] text-white">check</span>
                      </div>
                    )}
                  </label>
                ))}
              </div>

              {/* Card Details Form */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="0000 0000 0000 0000"
                      />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                        lock
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        CVV
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-primary"
                        placeholder="***"
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer mt-4">
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="rounded border-slate-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-slate-500">Save payment method for future bookings</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Total */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-lg font-bold mb-4">Price Details</h3>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Session Fee</span>
                    <span className="font-medium">${sessionDetails.fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service Fee</span>
                    <span className="font-medium">${sessionDetails.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="text-primary font-bold text-2xl">${sessionDetails.total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/booking/confirm')}
                  className="w-full py-4 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">verified_user</span>
                  Pay ${sessionDetails.total.toFixed(2)}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  By completing this purchase, you agree to MindCare's Terms of Service and Privacy Policy.
                  Your payment information is encrypted and securely processed.
                </p>
              </div>

              {/* Help Box */}
              <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary">contact_support</span>
                  <div>
                    <p className="text-sm font-bold mb-1">Need help?</p>
                    <p className="text-xs text-slate-500">Our support team is available 24/7 for any billing questions.</p>
                    <a href="#" className="text-xs text-primary font-bold mt-2 inline-block hover:underline">
                      Contact Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <footer className="mt-12 py-6 border-t border-slate-200 dark:border-slate-700 text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Secure SSL Encryption • 100% Private & Confidential</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default CheckoutPage;