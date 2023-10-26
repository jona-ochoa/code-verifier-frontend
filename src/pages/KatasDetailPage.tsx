import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';

const KatasDetailPage = () => {
  
  const { id } = useParams();

  const loggedIn = useSessionStorage('sessionJWTToken');

  const navigate = useNavigate();

  useEffect(() => {
    if(!loggedIn){
      return navigate('/login')
    }
  }, [loggedIn, navigate] )


  return (
    <div>KatasDetailPage: { id }</div>
  )
}

export default KatasDetailPage