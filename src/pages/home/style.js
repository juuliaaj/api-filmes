import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;

    h1 {
        text-align: center;
        margin: 4rem 0;
        color:rgb(133, 45, 45);
    }
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
`;

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    img {
        width: 180px;
        border-radius: 5px;
        margin-bottom: 2rem;
    }
    span {
        font-weight: bold;
        font-size: 120%;
        text-align: center;
    }
    a {
        transition: all 0.3s;
    }
    a:hover {
        transform: scale(1.1);
    }
`;

export const Btn = styled.button`
    margin-top: 8px;
    padding: 0.7rem 3rem;
    border: none;
    border-radius: 10px;
    color: #212121;
    background-color:rgb(236, 143, 143);
    font-weight: 1000;
    font-size: 12 px;
    cursor: pointer;
    transition: all 250ms;
`;
