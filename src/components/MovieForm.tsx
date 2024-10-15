// import React, { useState } from "react";
// import { Movie } from "../models/Movie";
// import { addMovie } from "../services/movieService";

// const MovieForm: React.FC = () => {
    
//     const [movie, setMovie] = useState<Movie>({name: "", year: 0, category: "",});

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value} = e.target;
//         setMovie({ ...movie, [name]: value});
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {

//             await addMovie(movie);
//             setMovie({ name: "", year: 0, category: "",});
//             alert("Movie added successfully!");
//         } catch ( error ) {
//             console.error("Error adding movie: ", error);
//             alert("Error adding movie");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Name:
//                 <input type="text" name="name" value={movie.name} onChange={handleChange} />
//             </label>
//             <label>
//                 Year:
//                 <input type="number" name="year" value={movie.year} onChange={handleChange} />
//             </label>
//             <label>
//                 Category:
//                 <input type="text" name="category" value={movie.category} onChange={handleChange} />
//             </label>
//             <input type="submit" value="Submit" />
//         </form>
//     )
// }

// export default MovieForm;

// src/components/MovieForm.tsx
import React, { useState } from 'react';
import { Movie } from '../models/Movie';
import { addMovie } from '../services/movieService';

const MovieForm: React.FC = () => {
    const [movie, setMovie] = useState<Movie>({ name: '', year: 0, category: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addMovie(movie);
            alert('Movie added successfully!');
            setMovie({ name: '', year: 0, category: '' });
        } catch (error) {
            console.error('Error adding movie', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            <h2 className="mb-4">Add Movie</h2>
            <div className="mb-3">
                <input
                    type="text"
                    name="name"
                    value={movie.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="number"
                    name="year"
                    value={movie.year}
                    onChange={handleChange}
                    placeholder="Year"
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    name="category"
                    value={movie.category}
                    onChange={handleChange}
                    placeholder="Category"
                    className="form-control"
                    required
                />
            </div>
            <button type="submit" className="btn btn-success">Add Movie</button>
        </form>
    );
};

export default MovieForm;
