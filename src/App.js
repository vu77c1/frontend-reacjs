
import './App.scss';
import Header from './components/admin/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import AppRoute from './routes/AppRoute';
import { useSelector, useDispatch } from 'react-redux';
import { handleUserRefresh } from './redux/actions/UserAction';
import { useEffect } from 'react';
function App() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    let email = cookies.get('email');
    if (email) {
      dispatch(handleUserRefresh())
    }
  }, [])
  return (
    <>
      <Header />
      <Container >
        <AppRoute />
      </Container>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
