import React, { useState, useEffect, useRef } from 'react';
import './UserProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

function UserProfile() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saveStatus, setSaveStatus] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [nomeCompletoInput, setNomeCompletoInput] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [calculatedAge, setCalculatedAge] = useState('');
    const [cepInput, setCepInput] = useState('');
    const [ruaInput, setRuaInput] = useState('');
    const [bairroInput, setBairroInput] = useState('');
    const [cidadeInput, setCidadeInput] = useState('');
    const [estadoInput, setEstadoInput] = useState('');
    const [biografiaInput, setBiografiaInput] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:3001/api/user/1');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setNomeCompletoInput(data.nome_completo || '');
                const formattedDate = data.data_nascimento ? new Date(data.data_nascimento).toISOString().split('T')[0] : '';
                setDateOfBirth(formattedDate);
                setCepInput(data.cep || '');
                setRuaInput(data.logradouro || ''); // Usar logradouro do ViaCEP
                setBairroInput(data.bairro || '');
                setCidadeInput(data.localidade || '');
                setEstadoInput(data.uf || '');
                setBiografiaInput(data.biografia || '');

                let imageSrc = null;
                if (data.foto_perfil) {
                    if (data.foto_perfil.startsWith('/9j/')) {
                        imageSrc = `data:image/jpeg;base64,${data.foto_perfil}`;
                    } else if (data.foto_perfil.startsWith('iVBORw0KGgo')) {
                        imageSrc = `data:image/png;base64,${data.foto_perfil}`;
                    } else if (data.foto_perfil.startsWith('R0lGODlh')) {
                        imageSrc = `data:image/gif;base64,${data.foto_perfil}`;
                    } else if (data.foto_perfil.startsWith('UklGR')) {
                        imageSrc = `data:image/webp;base64,${data.foto_perfil}`;
                    } else {
                        imageSrc = `data:image/png;base64,${data.foto_perfil}`;
                        console.warn("Unknown image type from backend. Attempting to display as PNG. Prefix:", data.foto_perfil.substring(0, 20));
                    }
                }
                setProfileImage(imageSrc);

            } catch (err) {
                setError('Failed to load user data: ' + err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleCepSearch = async () => {
        const cleanCep = cepInput.replace(/[^0-9]/g, '');

        if (!cleanCep || cleanCep.length !== 8) {
            setError('Invalid CEP. Please enter 8 digits.');
            return;
        }

        setSaveStatus('');
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
            if (!response.ok) {
                throw new Error(`ViaCEP API error: ${response.status}`);
            }
            const data = await response.json();

            if (data.erro) {
                setError('CEP not found.');
                setRuaInput('');
                setBairroInput('');
                setCidadeInput('');
                setEstadoInput('');
            } else {
                setRuaInput(data.logradouro || '');
                setBairroInput(data.bairro || '');
                setCidadeInput(data.localidade || '');
                setEstadoInput(data.uf || '');
            }
        } catch (err) {
            setError('Failed to fetch CEP: ' + err.message);
            console.error('Error fetching CEP:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatCep = (value) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue.length > 5) {
            return `${numericValue.slice(0, 5)}-${numericValue.slice(5, 8)}`;
        }
        return numericValue;
    };

    const handleCepChange = (e) => {
        setCepInput(formatCep(e.target.value));
        setError(null);
    };

    const calculateAge = (dobString) => {
        if (!dobString) return '';
        const today = new Date();
        const birthDate = new Date(dobString);

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return `${age} anos`;
    };

    useEffect(() => {
        setCalculatedAge(calculateAge(dateOfBirth));
    }, [dateOfBirth]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const MAX_FILE_SIZE = 2 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                setError('Image is too large. Max size: 2MB.');
                setProfileImage(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp'];
            if (!validImageTypes.includes(file.type)) {
                setError('Invalid file type. Please select an image (JPG, PNG, GIF, BMP, WEBP).');
                setProfileImage(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                if (error && error.includes('imagem')) {
                    setError(null);
                } else if (!error) {
                    setError(null);
                }
            };
            reader.onerror = () => {
                setError('Error reading image file.');
                setProfileImage(null);
            };
            reader.readAsDataURL(file);
        } else {
            setProfileImage(null);
            if (error && error.includes('imagem')) {
                setError(null);
            }
        }
    };

    const handleSave = async () => {
        setSaveStatus('');
        setError(null);
        setIsSaving(true);

        const updatedUserData = {
            nome_completo: nomeCompletoInput,
            data_nascimento: dateOfBirth || null,
            cep: cepInput.replace(/[^0-9]/g, ''),
            rua: ruaInput,
            bairro: bairroInput,
            localidade: cidadeInput, // Use localidade para o backend ViaCEP
            uf: estadoInput, // Use uf para o backend ViaCEP
            biografia: biografiaInput || null,
            foto_perfil: profileImage,
        };

        try {
            const response = await fetch('http://localhost:3001/api/user/1', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errorMessage = errorData.message || `Unknown error (Status: ${response.status})`;
                throw new Error(`Failed to save: ${errorMessage}`);
            }

            setSaveStatus('Profile saved successfully!');
        } catch (err) {
            setSaveStatus('Error saving profile: ' + err.message);
            console.error('Error saving:', err);
        } finally {
            setIsSaving(false);
            setTimeout(() => setSaveStatus(''), 5000);
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    if (loading) {
        return <div className="profile-loading">Loading profile...</div>;
    }

    const isGeneralFetchError = error && !error.includes('CEP') && !error.includes('imagem');
    if (isGeneralFetchError) {
        return <div className="profile-error">{error}</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-header">
                <button className="back-button" onClick={handleGoBack}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>

                <h1 className="profile-main-title">Meu Perfil</h1>

                <div className="header-content-wrapper">
                    <div className="profile-avatar-container">
                        <img
                            src={profileImage || 'https://via.placeholder.com/150?text=Add+Photo'}
                            alt="Profile"
                            className="profile-avatar"
                            onClick={() => fileInputRef.current.click()}
                            style={{ cursor: 'pointer' }}
                        />
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/webp"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                        />
                        {error && error.includes('imagem') && <p className="image-error-message">{error}</p>}
                    </div>

                    <div className="user-info-header">
                        <div className="input-group-header">
                            <label htmlFor="nomeCompleto">Nome completo</label>
                            <input
                                type="text"
                                id="nomeCompleto"
                                className="input-field-header"
                                placeholder="Andreza Teste"
                                value={nomeCompletoInput}
                                onChange={(e) => setNomeCompletoInput(e.target.value)}
                            />
                        </div>
                        <div className="input-group-header">
                            <label htmlFor="dataNascimento">Data de Nascimento</label>
                            <input
                                type="date"
                                id="dataNascimento"
                                className="input-field-header"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            {calculatedAge && (
                                <p className="calculated-age">Idade: {calculatedAge}</p>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <section className="profile-content">
                <div className="address-section">
                    <h2>ENDEREÇO</h2>
                    <div className="input-group">
                        <label htmlFor="cep">Cep</label>
                        <div className="input-with-button">
                            <input
                                type="text"
                                id="cep"
                                className="input-field"
                                placeholder="00000-000"
                                value={cepInput}
                                onChange={handleCepChange}
                                maxLength="9"
                            />
                            <button
                                type="button"
                                className="search-button"
                                onClick={handleCepSearch}
                                disabled={loading || isSaving}
                            >
                                {loading ? '...' : <FontAwesomeIcon icon={faSearch} />}
                            </button>
                        </div>
                        {error && error.includes('CEP') && <div className="cep-error-message">{error}</div>}
                    </div>
                    <div className="input-group">
                        <label htmlFor="rua">Rua</label>
                        <input
                            type="text"
                            id="rua"
                            className="input-field"
                            placeholder="Sua Rua"
                            value={ruaInput}
                            onChange={(e) => setRuaInput(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="bairro">Bairro</label>
                        <input
                            type="text"
                            id="bairro"
                            className="input-field"
                            placeholder="Seu Bairro"
                            value={bairroInput}
                            onChange={(e) => setBairroInput(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="cidade">Cidade</label>
                        <input
                            type="text"
                            id="cidade"
                            className="input-field"
                            placeholder="Sua Cidade"
                            value={cidadeInput}
                            onChange={(e) => setCidadeInput(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="estado">Estado</label>
                        <input
                            type="text"
                            id="estado"
                            className="input-field"
                            placeholder="UF"
                            value={estadoInput}
                            onChange={(e) => setEstadoInput(e.target.value)}
                        />
                    </div>
                </div>

                <div className="large-text-area-section">
                    <textarea
                        className="large-text-area"
                        placeholder="Minha Biografia..."
                        value={biografiaInput}
                        onChange={(e) => setBiografiaInput(e.target.value)}
                    ></textarea>
                </div>
            </section>

            <section className="save-section">
                <button
                    type="button"
                    className="save-button"
                    onClick={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                {saveStatus && (
                    <p className={`save-status ${saveStatus.includes('sucesso') ? 'success' : 'error'}`}>
                        {saveStatus}
                    </p>
                )}
            </section>

            {/* O RODAPÉ DEVE ESTAR AQUI, DENTRO DO profile-container */}
            <footer className="profile-footer">
                <p>&copy; 2025 Minha Aplicação. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}

export default UserProfile;