import React, { useState } from 'react';

// Mock authentication and data storage
const mockUsers = [
  { email: 'user@example.com', password: 'password123' }
];

const ECommerceApp = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products] = useState([
    { 
      id: 1, 
      name: "Smartphone Elegante", 
      price: 599, 
      image: "/api/placeholder/400/320" 
    },
    { 
      id: 2, 
      name: "Cuffie Wireless", 
      price: 199, 
      image: "/api/placeholder/400/320" 
    },
    { 
      id: 3, 
      name: "Smartwatch", 
      price: 299, 
      image: "/api/placeholder/400/320" 
    },
    { 
      id: 4, 
      name: "Tablet", 
      price: 449, 
      image: "/api/placeholder/400/320" 
    }
  ]);

  // Login simulation
  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({ email });
      // Simulate fetching user orders
      setOrders([
        {
          id: 1,
          date: new Date(),
          total: 599,
          items: [products[0]]
        }
      ]);
    } else {
      alert('Login fallito');
    }
  };

  // Signup simulation
  const handleSignUp = (e) => {
    e.preventDefault();
    if (email && password) {
      mockUsers.push({ email, password });
      setUser({ email });
      alert('Registrazione completata');
    } else {
      alert('Compila tutti i campi');
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  // Add to cart
  const addToCart = (product) => {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Place order
  const placeOrder = () => {
    if (!user) {
      alert("Effettua il login per ordinare");
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      date: new Date(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    setOrders([...orders, newOrder]);
    setCart([]);
    alert("Ordine completato con successo!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto p-6">
        {/* Navbar traslucido */}
        <nav className="bg-white/10 backdrop-blur-md rounded-full p-4 mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ModernShop</h1>
          {user ? (
            <button 
              onClick={handleLogout}
              className="bg-red-500/50 hover:bg-red-600/50 px-4 py-2 rounded-full transition"
            >
              Logout
            </button>
          ) : null}
        </nav>

        {/* Sezione Login/Registrazione */}
        {!user ? (
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-white/20 rounded-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-white/20 rounded-full p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex space-x-4">
                <button 
                  type="submit" 
                  className="w-full bg-blue-500/50 hover:bg-blue-600/50 rounded-full p-3 transition"
                >
                  Login
                </button>
                <button 
                  type="button"
                  onClick={handleSignUp}
                  className="w-full bg-green-500/50 hover:bg-green-600/50 rounded-full p-3 transition"
                >
                  Registrati
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {/* Sezione Prodotti */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center hover:scale-105 transition"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-bold">{product.name}</h3>
                  <p className="text-gray-300">€{product.price}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="mt-4 w-full bg-blue-500/50 hover:bg-blue-600/50 rounded-full p-2 transition"
                  >
                    Aggiungi al Carrello
                  </button>
                </div>
              ))}
            </div>

            {/* Sezione Carrello */}
            <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">Carrello</h2>
              {cart.map(item => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center mb-4 bg-white/20 rounded-full p-3"
                >
                  <span>{item.name}</span>
                  <div className="flex items-center space-x-4">
                    <span>€{item.price * item.quantity}</span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500/50 hover:bg-red-600/50 px-3 py-1 rounded-full transition"
                    >
                      Rimuovi
                    </button>
                  </div>
                </div>
              ))}
              {cart.length > 0 && (
                <button 
                  onClick={placeOrder}
                  className="w-full bg-green-500/50 hover:bg-green-600/50 rounded-full p-3 transition"
                >
                  Invia Ordine
                </button>
              )}
            </div>

            {/* Sezione Ordini */}
            <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-4">I Tuoi Ordini</h2>
              {orders.map(order => (
                <div 
                  key={order.id} 
                  className="bg-white/20 rounded-2xl p-4 mb-4"
                >
                  <p>Ordine del: {order.date.toLocaleDateString()}</p>
                  <p>Totale: €{order.total}</p>
                  <div>
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ECommerceApp;
