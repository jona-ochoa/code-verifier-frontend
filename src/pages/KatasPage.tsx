import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllKatas } from '../services/katasService';
import { AxiosResponse } from 'axios';
import { Kata } from '../utils/types/kata.type';

const KatasPage = () => {

  const loggedIn = useSessionStorage('sessionJWTToken');
  const navigate = useNavigate();

  const [katas, setKatas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login')
    } else {
      getAllKatas(loggedIn, 2, 1).then((res: AxiosResponse) => {

        if (res.status === 200 && res.data.katas && res.data.currentPage && res.data.totalPages) {
          console.table(res.data)

          const { katas, currentPage, totalPages } = res.data;
          setKatas(katas);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
        } else {
          throw new Error("Error fetching kata list");
        }

      }).catch((error) => console.error(`[GET ALL KATAS ERROR:] ${error}`))
    }
  }, [loggedIn, navigate])

  /**
   * Method navigate Kata Detail
   * @param id to navigate kata to Id
   */
  const navigateToKataDetail = (id: string) => {
    navigate(`/katas/${id}`)
  }

  return (
    <div>
      <h1>KatasPage</h1>
      {katas.length > 0 ?
        (
          <div>

            {katas.map((kata: Kata) => {
              return (
                <section style={{ border: "2px solid #fff", textAlign: "left", padding: "30px", marginBottom: "10px", cursor: "pointer" }} key={kata._id} onClick={() => navigateToKataDetail(kata._id)}>
                  <h3>Name: {kata.name}</h3>
                  <h3>Description: {kata.description}</h3>
                  <h3>Creator: {kata.creator}</h3>
                  <h3>Level: {kata.level}</h3>
                  <h3>Rating {kata.stars}/5</h3>
                  <h3>Intents: {kata.intents}</h3>
                  <h3>Solution: {kata.solution}</h3>
                  <h4>Participants: {kata.participants}</h4>
                  <p>Page: {totalPages}</p>
                  <p>Current Page: {currentPage}</p>
                </section>
              )
            })}

          </div>
        )
        :
        (
          <div>
            <h5>No Katas Found</h5>
          </div>
        )
      }
    </div>
  )
}

export default KatasPage