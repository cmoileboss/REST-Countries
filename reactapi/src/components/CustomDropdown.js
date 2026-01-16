import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import CountryList from './CountryList.js'


export default function CustomDropdown({ options, label}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(label);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleMenu = () => setIsOpen(!isOpen);

    const selectOption = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    let countries = CountryList(selected,searchTerm);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    return (
        <div>
            <div className="custom-dropdown">
                <button className="dropdown-toggle" onClick={toggleMenu}>
                    {selected} <FaChevronDown />
                </button>
                <input type="text"
                placeholder='Tapez votre recherche'
                value={searchTerm}
                onChange={handleChange}
                />
                {isOpen && (
                    <ul className="dropdown-menu">
                        {options.map((option) => (
                            <li key={option} onClick={() => selectOption(option)}>
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <section>
                {countries}
            </section>
        </div>
    );
}