import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import CountryList from './CountryList.js'


export default function CustomDropdown({ options, label, orders}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(label);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpenOrder, setIsOpenOrder] = useState(false);
    const [order, setOrder] = useState('Default');

    const toggleMenu = () => setIsOpen(!isOpen);

    const selectOption = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    let countries = CountryList(selected,searchTerm);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const toggleOrder = () => setIsOpenOrder(!isOpenOrder);

    const selectOrder = (order) => {
        setOrder(order);
        setIsOpenOrder(false);
        }

    return (
        <div>
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
                <input type="text"
                placeholder='Tapez votre recherche'
                value={searchTerm}
                onChange={handleChange}
                />
                <button className="dropdown-toggle" onClick={toggleOrder}>
                    {order} <FaChevronDown />
                </button>
                {isOpenOrder && (
                    <ul className="dropdown-menu">
                        {orders.map((order) => (
                            <li key={order} onClick={() => selectOrder(order)}>
                                {order}
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