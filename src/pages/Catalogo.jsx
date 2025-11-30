import Navbar from "../components/Navbar";
import CatalogList from "../components/CatalogList";
import Footer from "../components/Footer";

function Catalogo() {
  return (
    <div style={{backgroundColor: "black"}}>
      <Navbar />
      <CatalogList />
      <Footer />
    </div>
  );
}

export default Catalogo;
