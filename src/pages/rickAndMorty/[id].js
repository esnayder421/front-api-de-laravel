import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getByIdCharacters } from '@/services/rickMorty.services/endpoint'
import Image from 'next/image'
import Link from 'next/link';
import Loader from '@/components/Loader';


function Details() {
	const router = useRouter();
	const { id } = router.query;
	const [character, setCharacter] = useState({})
	const [loader, setloader] = useState(true)

	useEffect(() => {
		setloader(true)
		const getOne = async () => {
			const response = await getByIdCharacters(id)
			setCharacter(response)
		}
		getOne()
		setloader(false)
	}, [])

	if(loader){
		return <Loader/>
	}else{
		return (
			<div className='container align-items-center d-flex justify-content-center p-4'>
				<div className="card text-center" style={{ width: "40rem" }}>
					<div className="card-header">Personaje {character.name}</div>
						<div className="card-body">
							<Image src={character.image} alt="Imagen personaje" width="250" height="250" className="rounded-circle"/>
							<h5 className="card-title">{character.name}</h5>
							<p className="card-text">
									
							</p>
							<p>{character.status}</p>
							<p>Especie del personaje: {character.species}</p>
							<p>tipo del personaje: {character.type}</p>
							{/* <p>origen del personaje : {character.origin.name}</p>
							<p>locaion del personaje: {character.location.name}</p> */}
							<Link href="/profile/Profile" className="btn btn-primary">
								Regresar
							</Link>
						</div>
					<div className="card-footer text-muted">Rick And Morty</div>
				</div>
			</div>
		)
	}
}

export default Details