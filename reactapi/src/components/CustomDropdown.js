import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function CustomDropdown({ options, label}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(label);

    const toggleMenu = () => setIsOpen(!isOpen);

    const selectOption = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="custom-dropdown">
            <button className="dropdown-toggle" onClick={toggleMenu}>
                {selected} <FaChevronDown />
            </button>
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
    );
}