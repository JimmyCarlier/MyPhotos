import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { UseSession } from '../Components/UseSession';

const Pagination = ({ photos, alts, id }) => {
    const [vote, setVote] = useState();
    const [availableVote, setAvailableVote] = useState(3);
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
  const handleVote = async (id) => {
    let titleTexte;
    if (availableVote === 1) {
      titleTexte = `Vous êtes sur le point d'utiliser votre dernier vote`;
    } else {
      titleTexte = `Vous êtes sur le point d'utiliser un de vos ${availableVote} votes disponible`;
    }
    Swal.fire({
      title: titleTexte,
      text: "Validez vous votre choix ?",
      icon: "question",
      iconColor: "white",
      color: "white",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Valider",
      cancelButtonText: "Annuler",
      background: "rgba(0, 0, 0, 0.5)",
      allowOutsideClick: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setAvailableVote(availableVote - 1);
        Swal.fire("Vote validé");
        !localStorage.getItem("vote") && localStorage.setItem("vote", 0)

        var attempts = parseInt(localStorage.getItem("vote"));
        localStorage.setItem("vote", ++attempts);

        if (parseInt(localStorage.getItem("vote")) === 1) {
            let nowDate = new Date().toISOString().slice(0, 10);
            const day = {
                date: nowDate,
            };
            localStorage.setItem("date", day.date);
        }
        const addVote = {
          votes: + 1,
        };

        const token = UseSession();

        const fetchOption = {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(addVote),
        };

        const fetchUpdate = await fetch(
          `http://localhost:3000/file/updateVote/${id}`,
          fetchOption
        );

        setVote(fetchUpdate);
      }
    });
  };
  const checkVoteNumber =() => {
    let nowDate = new Date().toISOString().slice(0, 10);
    //Check If nextDay to reset votes
    localStorage.getItem("date") && 
    localStorage.getItem("date") !== nowDate &&
    localStorage.removeItem("date") && localStorage.removeItem("vote");
    
    //Check if user has already voted 3 times and hide all btn else show all btn
    localStorage.getItem("vote") &&
    parseInt(localStorage.getItem("vote")) === 3 ?
        document.querySelectorAll("#btn-disapear").forEach((e) => {
            e.style.display = "none";
        }) :
        document.querySelectorAll("#btn-disapear").forEach((e) => {
            e.style.display = "block";
        });
    }
    
    useEffect(() => {
    checkVoteNumber();

}, [vote,refresh])
  return (
    <>
    <div className='AllPhotosPagination'>
      <table>
        <tbody>
          {currentPhotos.reduce((rows, photo, index) => {
            {index % 2 === 0 && 
                rows.push(
                <tr>
                    <td className='tdPhotos' key={id[index]}>
                    <img onClick={() =>handleFullScreen(photo)} src={"http://localhost:3000/"+photo} alt={alts[index]} />
                    <button
                        className="btn-choose btn-disapear" id='btn-disapear'
                        onClick={() => handleVote(id[index])}
                        >
                        Voter
                      </button>
                    </td>
                    {currentPhotos[index + 1] !== undefined &&
                    <td className='tdPhotos' key={id[index + 1]}>
                    {currentPhotos[index + 1] && (
                        <img onClick={() =>handleFullScreen(currentPhotos[index + 1])} src={"http://localhost:3000/"+currentPhotos[index + 1]} alt={alts[index + 1]} />
                        )}
                    <button
                        className="btn-choose btn-disapear" id='btn-disapear'
                        onClick={() => handleVote(id[index + 1])}
                        >
                        Voter
                      </button>
                    </td>}
                </tr>
                );
            }
            return rows;
            }, [])}
        </tbody>
      </table>
      {totalPages !== 1 &&<div className='containerBtnPrevNext'>
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
