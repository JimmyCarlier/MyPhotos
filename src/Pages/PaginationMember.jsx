import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UseSession } from '../Components/UseSession';

const Pagination = ({ photos, alts, id, status, votes }) => {
    //CODE POUR LA PAGINATION
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const indexOfLastPhoto = currentPage * itemsPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - itemsPerPage;
  const currentPhotos = photos.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const [imgFullScreen, setImgFullScreen] = useState('');
  const totalPages = Math.ceil(photos.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    setRefresh(!refresh)
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    setRefresh(!refresh)
  };
  //CODE POUR LES VOTES
     const handleFullScreen = (link) => {
        if(link)
        {
            setImgFullScreen(`http://localhost:3000/${link}`)
            const mymodaldocument = document.querySelector('.MyModalPhotoFullScreen')
            mymodaldocument.style.display = 'block';
        }
    }
    const handleCloseFullScreen = () => {
        document.querySelector('.MyModalPhotoFullScreen').style.display = 'none';
    }
    
  useEffect(() => {

}, [refresh])
  return (
    <>
    <div className='AllPhotosPagination'>
      <table>
        <tbody>
          {currentPhotos.reduce((rows, photo, index) => {
            {index % 2 === 0 && 
                rows.push(
                <tr>
                    <td className='container-ownPicture' key={id[index]}>
                      {status[index] === "publie" &&
                        votes[index] !== null &&
                      <p className="votesMembre">Votes : {votes[index]}</p>}
                      {status[index] === "publie" && (
                        <div className="published-pic">Publié</div>
                      )}
                      {status[index] === "nonpublie" && (
                        <div className="unpublished-pic">En attente</div>
                      )}
                      {status[index] === "rejete" && (
                        <div className="rejected-pic">Rejeté</div>
                      )}
                    <img onClick={() =>handleFullScreen(photo)} src={"http://localhost:3000/"+photo} alt={alts[index]} 
                    className="picture-status" />
                    </td>
                    {currentPhotos[index + 1] !== undefined &&
                    <td className='container-ownPicture' key={id[index + 1]}>
                      {status[index + 1] === "publie" &&
                        votes[index+1] !== null &&
                      <p className="votesMembre">Votes : {votes[index+1]}</p>}
                      {status[index + 1] === "publie" && (
                        <div className="published-pic">Publié</div>
                      )}
                      {status[index + 1] === "nonpublie" && (
                        <div className="unpublished-pic">En attente</div>
                      )}
                      {status[index + 1] === "rejete" && (
                        <div className="rejected-pic">Rejeté</div>
                      )}
                    {currentPhotos[index + 1] && (
                        <img onClick={() =>handleFullScreen(currentPhotos[index + 1])} src={"http://localhost:3000/"+currentPhotos[index + 1]} alt={alts[index + 1]} 
                        className="picture-status" />
                        )}
                    </td>}
                </tr>
                );
            }
            return rows;
            }, [])}
        </tbody>
      </table>
      {totalPages > 1 &&<div className='containerBtnPrevNext'>
        <button className='btnPrevNext' onClick={prevPage} disabled={currentPage === 1}>
          Précédent
        </button>
        <button className='btnPrevNext' onClick={nextPage} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>}
    </div>
    <div className='MyModalPhotoFullScreen' onClick={handleCloseFullScreen}>
        <img src={imgFullScreen} alt='gggg' />
    </div>
    </>
  );
};

export default Pagination;
