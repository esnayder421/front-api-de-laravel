import { useEffect, useState } from 'react'
import { getCharacters } from './services/endpoint'
import Cards from '@/components/Cards'

function Characters() {

    const [paginate, setPaginate] = useState()
    const [dataCharacters, setdataCharacters] = useState()

    useEffect(() => {
        const characters = async () => {
            const response = await getCharacters(paginate)

            setdataCharacters(response)
        }
        characters()
    }, [])
    return (
        <div className='row'>
            <h2 className='text-center display-5 py-4'>Personajes Rick And Morty </h2>
            {
                dataCharacters?.map((character) => (
                    <div className='col p-2 align-items-center d-flex justify-content-center'>
                        <Cards character={character} key={character.id} />
                    </div>
                ))
            }
        </div>
    )
}

export default Characters