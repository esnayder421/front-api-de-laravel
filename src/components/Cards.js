import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


function Cards({ character }) {

    return (

       
            <div className="card" style={{ width: "15rem" }}>
                <div className='text-center py-2'>
                    <Image src={character.image} alt="..." width="80" height="80" className="rounded-circle" />
                </div>
                <div className="card-body text-center">
                    <h5 className="card-title">{character.name}</h5>
                    <Link href={`/rickAndMorty/${character.id}`} passHref legacyBehavior>
                        <button className="btn btn-success" type="submit">Ver </button>
                    </Link>
                </div>
            </div>
        
    )
}

export default Cards