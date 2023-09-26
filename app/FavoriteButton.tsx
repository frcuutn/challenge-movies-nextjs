import React, { FunctionComponent, useState } from 'react';
import { IoIosBookmark as BookMarks } from '@react-icons/all-files/io/IoIosBookmark'

type FavoriteButtonProps = {
    isFavorite: boolean
    onClick: Function
}
const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({ isFavorite, onClick }) => {
    return (
        <button style={buttonStyle} onClick={() => onClick()}>
            {isFavorite ? (
                <BookMarks color='gold'  size={34} />
            ) : (
                <BookMarks color='white' size={34}/>
            )}
        </button>
    );
}

const buttonStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
};

export default FavoriteButton;