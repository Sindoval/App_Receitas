import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

export default function Profile() {
  return (
    <div>
      <Header
        headerData={{ title: 'PROFILE', boolProfile: true, boolSearch: false }}
      />
      <Footer />
    </div>
  );
}
