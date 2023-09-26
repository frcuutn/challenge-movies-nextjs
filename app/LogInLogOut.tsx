import { FunctionComponent } from 'react'
import useAuth from './hooks/useAuth';

type LogInLogOutProps = {
  setAccountId: Function
}
const LogInLogOut: FunctionComponent<LogInLogOutProps> = ({ setAccountId }) => {
  const { isLoggedIn, login, logout, getAccountId } = useAuth();
  return (
    isLoggedIn() ? (
      <div style={{float: 'right'}}>
        <label>Welcome back, {window.localStorage.getItem('accountName')}. </label>
        <button style={buttonStyle} onClick={() => {
          logout()
          setAccountId('')
        }}>Logout</button>
      </div>
    ) : (
      <div style={{float: 'right'}}>
        <label>Please login to see and filter your favorite movies. </label>
        <button style={buttonStyle} onClick={() => { 
          login('demo','demo').then(() => {
            setAccountId(getAccountId())
          })
        }}>Login</button>
      </div>
    ) 
  )
}

const buttonStyle = {
    background: '#831010',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    padding: '10px 20px',
    'border-radius': '5px',
};

export default LogInLogOut
  