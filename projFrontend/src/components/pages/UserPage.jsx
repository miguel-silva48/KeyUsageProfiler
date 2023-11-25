import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import { fetchData } from '../../utils';
import Footer from '../layout/Footer';

const ProductPage = () => {
  const { id } = JSON.parse(localStorage.getItem('user'));
  const { token } = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  console.log('id -> ', id);

  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [actualPassword, setActualPassword] = useState('');
  const [showAlertPass, setShowAlertPass] = useState(false);
  const [showAlertSamePass, setShowAlertSamePass] = useState(false);
  const [changeSuccess, setchangeSuccess] = useState(false);
  const [showChangeFail, setShowChangeFail] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchData(`/user/view?id=${id}&token=${token}`);
      setUser(data);
    };
    initialize();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleChangePass = async (event) => {
    event.preventDefault();

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setShowAlertPass(true);
    } else {
      setShowAlertPass(false);
    }
    if (password !== newPassword) {
      setShowAlertSamePass(true);
    } else {
      setShowAlertSamePass(false);
    }

    if (showAlertPass || showAlertSamePass) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('id', id);
      formData.append('token', token);
      formData.append('newPassword', password);
      formData.append('oldPassword', actualPassword);
      const response = await fetch(
        'http://localhost:8080/user/updatePassword',
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response;
      console.log(data);
      if (data.status === 200) {
        setShowChangeFail(false);
        setchangeSuccess(true);
        setTimeout(() => {
          document.getElementById('modal_ChangePass').close();
          setchangeSuccess(false);
        }, 2000);
      } else {
        setShowChangeFail(true);
      }
    } catch (error) {
      console.error('Error during API call', error);
    }
  };

  const handleViewDetails = (purchase) => {
    setSelectedOrder(purchase.items);
    document.getElementById('modal_viewDetails').showModal();
  };

  console.log('User ->', user);

  return (
    <div className="bg-base-200">
      <Navbar />

      <div
        id="body"
        className="flex flex-wrap mx-[5%]"
      >
        <div className="w-full m-4 p-4 flex flex-row bg-base-100 rounded-xl shadow-lg">
          <div className="avatar w-40">
            <img
              src={'../../' + user.image}
              alt="User Image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <span className="mx-4">
            <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
            <p className="text-lg mb-2">{user.email}</p>

            <div className="flex">
              <button
                className="btn btn-accent mb-2 mr-2"
                onClick={() =>
                  document.getElementById('modal_ChangePass').showModal()
                }
              >
                Change Password
              </button>
              <button
                className="btn btn-accent mb-2"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </span>
        </div>

        <div className="w-full h-full m-4 p-4 rounded-xl shadow-lg bg-base-100">
          <h2 className="text-2xl font-bold mt-4 mb-2">My orders</h2>
          {user?.request_History?.length === 0 ? (
            <p>No purchases done yet</p>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>State</th>
                  <th>Total Spent</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {user.request_History?.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.id}</td>
                    <td>Delivered</td>
                    <td>{purchase.total.toFixed(2)}€</td>
                    <td>
                      <button
                        className="btn btn-accent"
                        onClick={() => handleViewDetails(purchase)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Footer />

      <dialog
        id="modal_ChangePass"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Password!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Actual Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={actualPassword}
              onChange={(e) => setActualPassword(e.target.value)}
            />
          </div>
          {showChangeFail && (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! Wrong Password!</span>
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {showAlertPass && (
            <div className="alert alert-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>
                Warning: Password must have at least 8 characters, 1 uppercase,
                1 lowercase, 1 number and 1 special character!
              </span>
            </div>
          )}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          {showAlertSamePass && (
            <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Error! The passwords are not the same!</span>
            </div>
          )}
          {changeSuccess && (
            <div className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Pass Changed Successfully!</span>
            </div>
          )}
          <div className="modal-action flex">
            <form method="dialog">
              <button
                className="btn btn-primary mr-2"
                onClick={handleChangePass}
              >
                Submit
              </button>
            </form>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog
        id="modal_viewDetails"
        className="modal"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Details</h3>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder?.map((item) => (
                <tr key={item.id}>
                  <td>{item.prod.name}</td>
                  <td>{item.prod.price}€</td>
                  <td>{item.quantity}</td>
                  <td>{item.prod.price * item.quantity}€</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="modal-action flex">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ProductPage;
