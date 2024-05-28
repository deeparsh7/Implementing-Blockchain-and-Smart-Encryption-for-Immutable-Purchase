import { Navbar, Welcome, Footer, Services, Transactions, Certificate } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <Transactions />
    <Services />
    <Footer />
  </div>
);

export default App;
