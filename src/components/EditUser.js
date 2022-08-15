import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
 
const EditUser = () => {
  const [Nama, setNama] = useState("");
  const [NIM, setNIM] = useState("");
  const [Kelas, setKelas] = useState("");
  const [Semester, setSemester] = useState("");
  const [JenisKelamin, setJenisKelamin] = useState("Pilih");
  const [Alamat, setAlamat] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
 
  useEffect(() => {
    getUserById();
  }, []);
 
  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setNama(response.data.name);
    setNIM(response.data.NIM);
    setKelas(response.data.Kelas);
    setSemester(response.data.Semester);
    setJenisKelamin(response.data.JenisKelamin);
    setAlamat(response.data.Alamat);
  };
 
  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        Nama,
        NIM,
        Kelas,
        Semester,
        JenisKelamin,
        Alamat,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="columns mt-5">
      <div className="column is-half">
        <form onSubmit={updateUser}>
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={Nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">NIM</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={NIM}
                onChange={(e) => setNIM(e.target.value)}
                placeholder="NIM"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Kelas</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={Kelas}
                onChange={(e) => setKelas(e.target.value)}
                placeholder="Kelas"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Semester</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={Semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Semester"
              />                            
            </div>
          </div>
          <div className="field">
            <label className="label">JenisKelamin</label>
            <div className="control">
              <div className="select is-fullwidth">
                <select
                  value={JenisKelamin}
                  onChange={(e) => setJenisKelamin(e.target.value)}
                >
                  <option value="Male">Laki-laki</option>
                  <option value="Female">Perempuan</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Alamat</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={Alamat}
                onChange={(e) => setAlamat(e.target.value)}
                placeholder="Alamat"
                />
            </div>
          </div>                             
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-success">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
 
export default EditUser;