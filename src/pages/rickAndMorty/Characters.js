import { useEffect, useState, useMemo } from 'react'
import { getCharacters} from '@/services/rickMorty.services/endpoint'
import Cards from '@/components/Cards'
import Loader from '@/components/Loader'

function Characters() {

    const [paginate, setPaginate] = useState(1)
    const [dataCharacters, setdataCharacters] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const characters = async () => {
            const response = await getCharacters(paginate)

            setdataCharacters(response)
        }
        characters()
        setLoading(false)
    }, [paginate])
    if (loading) {
        return <Loader />
    } else {

        return (
            <>
                <div className='row'>
                    <h2 className='text-center display-5 py-4'>Personajes Rick And Morty </h2>
                    <div className='row'>
                        <div className='col align-items-center d-flex justify-content-center p-2'>

                            {
                                paginate > 1 ? (<button onClick={Event => (setPaginate(paginate - 1))} className='btn btn-warning'>Volver </button>) : ""
                            }
                        </div>
                        <div className='col align-items-center d-flex justify-content-center'>
                            <button onClick={Event => (setPaginate(paginate + 1))} className='btn btn-info'> Proxima Pagina</button>
                        </div>
                    </div>
                    
                    {
                        dataCharacters?.map((character) => (
                            <div key={character.id} className='col p-2 align-items-center d-flex justify-content-center'>
                                <Cards character={character} key={character.id} />
                            </div>
                        ))
                    }
                </div>


            </>
        )
    }
}

export default Characters