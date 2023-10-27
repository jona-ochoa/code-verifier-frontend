import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getKatasById } from '../services/katasService';
import { AxiosResponse } from 'axios';
import { Kata } from '../utils/types/kata.type';
import { Editor } from '../components/editor/Editor';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import StarIcon from '@mui/icons-material/Star';

const KatasDetailPage = () => {


  const navigate = useNavigate();
  const loggedIn = useSessionStorage('sessionJWTToken');
  const { id } = useParams();
  const [kata, setKata] = useState<Kata | undefined>(undefined);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login')
    } else {
      if (id) {
        getKatasById(loggedIn, id).then((response: AxiosResponse) => {
          if (response.status === 200 && response.data) {
            const kataData: Kata = {
              _id: response.data._id,
              name: response.data.name,
              description: response.data.description,
              stars: response.data.stars,
              level: response.data.level,
              creator: response.data.creator,
              solution: response.data.solution,
              intents: response.data.intents,
              participants: response.data.participants
            }
            setKata(kataData)
          }
        }).catch((error) => console.error("ERROR GET_KATA_BY_ID:", error))
      } else {
        return navigate('/katas')
      }
    }
  }, [loggedIn, navigate, id])


  return (
    <div>
      <h3> KatasDetailPage: {id} </h3>

      {kata ?
        <Card sx={{ minWidth: 275 }}>
          <h4> Name: {kata?.name} </h4>
          <div style={{ alignItems: "center", justifyContent: "center" }}> Rating: <StarIcon color="warning" /> {kata?.stars}/5</div>
          <h4> Intents: {kata?.intents} </h4>
          <h4> Level: {kata?.level} </h4>

          <Button
            variant="contained"
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? 'Show Solution' : 'Hide Solution'}
          </Button>
          {showSolution ? null : <Editor>{kata?.solution}</Editor>}
        </Card>
        :
        <div>
          <h2>Loading data...</h2>
        </div>
      }

    </div>
  )
}

export default KatasDetailPage