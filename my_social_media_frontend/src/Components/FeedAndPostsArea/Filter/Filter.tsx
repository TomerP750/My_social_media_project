import "./Filter.css";
import { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


interface FilterProps {
    setFilter: React.Dispatch<React.SetStateAction<'Newest' | 'Oldest'>>;
}
export function Filter(props: FilterProps): JSX.Element {
    const [isArrowUp, setIsArrowUp] = useState(true);

    const toggleFilter = () => {
        if (isArrowUp) {
            props.setFilter('Oldest');
            setIsArrowUp(false);
        } else {
            props.setFilter('Newest');
            setIsArrowUp(true);
        }
    };


    return (
        <div className="Filter">
            <div className="filterLine" onClick={toggleFilter}>
                <span>{isArrowUp ? 'Newest to Oldest' : 'Oldest to Newest'}</span>
                {isArrowUp ? (
                    <ArrowDropUpIcon className="arrow" sx={{marginRight:"-30px"}}/>
                ) : (
                    <ArrowDropDownIcon className="arrow" sx={{marginRight:"-30px"}}/>
                )}
            </div>
        </div>
    );
}
