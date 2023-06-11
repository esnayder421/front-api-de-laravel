import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { getByIdCharacters } from './services/endpoint'
import Image from 'next/image'


function Details() {
	const router = useRouter();
	const { id } = router.query;
	console.log(id)
	const [character, setCharacter] = useState({})

	useEffect(() => {
		const getOne = async () => {
			
				const response = await getByIdCharacters(id)
			console.log(response)
			setCharacter(response)
			
		}
		getOne()
	}, [])


	return (
		<div className='container'>
			<div className="card text-center" style={{ width: "24rem" }}>
				<div className="card-header">Personaje {character.name}</div>
					<div className="card-body">
						<Image src={character.image} alt="Imagen personaje" width="80" height="80" className="rounded-circle" />
						<h5 className="card-title">{character.name}</h5>
						<p className="card-text">
								
						</p>
						<p>{character.status}</p>
						<p>Especie del personaje: {character.species}</p>
						<p>tipo del personaje: {character.type}</p>
						{/* <p>origen del personaje : {character.origin.name}</p>
						<p>locaion del personaje: {character.location.name}</p> */}
						<a href="#" className="btn btn-primary">
							Go somewhere
						</a>
					</div>
				<div className="card-footer text-muted">Rick And Morty</div>
			</div>
		</div>
	)
}

export default Details