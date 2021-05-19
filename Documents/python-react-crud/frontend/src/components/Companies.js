import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API = process.env.REACT_APP_API;

const Companies = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [nit, setNit] = useState('');
    const [numberphone, setNumberPhone] = useState('');
    const [editing, setEditing] = useState(false);
    const [idEdit, setIdEdit] = useState('');

    const [companies, setCompanies] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing) {
            await axios.post(`${API}/companies`, {
                name,
                address,
                nit,
                numberphone
            })
        } else {
            await axios.put(`${API}/companies/${idEdit}`, {
                name,
                address,
                nit,
                numberphone
            })
            setEditing(false)
        }

        setName('')
        setAddress('')
        setNit('')
        setNumberPhone('')        
    }

    const getCompanies = async () => {
        const res = await axios(`${API}/companies`)
        setCompanies(res.data);
    }

    const deleteCompany = async (id) => {
        const confirmResponse = window.confirm('¿Estás seguro de eliminar esta empresa?');
        if (confirmResponse)
            await axios.delete(`${API}/companies/${id}`)
    }

    const editCompany = async (id) => {
        setEditing(true)
        setIdEdit(id)

        const res = await axios.get(`${API}/companies/${id}`)
        const { address, name, nit, numberphone } = res.data;
        setName(name)
        setAddress(address)
        setNit(nit)
        setNumberPhone(numberphone)
    }

    useEffect(() => {
        getCompanies();
    }, [companies])



    return (
        <div className="row">
            <div className="col-md-4">
                <form
                    onSubmit={handleSubmit}
                    className="card card-body"
                >
                    <div className="form-group m-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de la empresa"
                            onChange={e => setName(e.target.value)}
                            value={name}
                            autoFocus
                        />
                    </div>

                    <div className="form-group m-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dirección"
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>

                    <div className="form-group m-1">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="NIT"
                            onChange={e => setNit(e.target.value)}
                            value={nit}
                        />
                    </div>

                    <div className="form-group m-1">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Teléfono"
                            onChange={e => setNumberPhone(e.target.value)}
                            value={numberphone}
                        />
                    </div>

                    <button className="btn btn-primary btn-block mt-3">
                        {!editing ? 'Crear Empresa' : 'Actualizar Datos'}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Empresa</th>
                            <th>Dirección</th>
                            <th>NIT</th>
                            <th>Teléfono</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map(company => (
                            <tr key={company._id}>
                                <td>{company.name}</td>
                                <td>{company.address}</td>
                                <td>{company.nit}</td>
                                <td>{company.numberphone}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => editCompany(company._id)}
                                    >Editar</button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCompany(company._id)}
                                    >Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Companies
