import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSessionStorage } from '../hooks/useSessionStorage';

const KatasPage = () => {

  const loggedIn = useSessionStorage('sessionJWTToken');

  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn){
      return navigate('/login')
    }
  }, [loggedIn, navigate] )

  /**
   * Method navigate Kata Detail
   * @param id to navigate kata to Id
   */
  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`)
  }

  return (
    <div>
      <h1>KatasPage</h1>
      <ul>
        <li onClick={() => navigateToKataDetail(1)}>First Kata</li>
        <li onClick={() => navigateToKataDetail(2)}>Second Kata</li>
      </ul>
    </div>
  )
}

export default KatasPage