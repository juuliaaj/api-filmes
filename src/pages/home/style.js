import styled from "styled-components";

export const Container = styled.div`
    padding: 2rem;
    background-color: #0a0a0a;
    min-height: 100vh;

    h1 {
        text-align: center;
        margin: 2rem 0;
        color: #ff007f;
        font-size: 2.2rem;
        font-weight: 800;
    }
`;

export const MovieList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 2rem;
    padding: 0;
`;

export const Movie = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.05));
    border-radius: 14px;
    padding: 1rem;
    transition: transform 0.3s, box-shadow 0.3s, background 0.3s;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 0 20px rgba(255, 0, 128, 0.3);
        background: linear-gradient(145deg, rgba(255, 0, 128, 0.05), rgba(255, 255, 255, 0.02));
    }

    img {
        width: 160px;
        border-radius: 12px;
        margin-bottom: 1rem;
        box-shadow: 0 4px 15px rgba(255, 0, 128, 0.25);
        transition: transform 0.3s;
    }

    img:hover {
        transform: scale(1.03);
    }

    span {
        font-weight: 700;
        font-size: 1rem;
        text-align: center;
        color: #f2f2f2;
        margin-top: 0.3rem;
        min-height: 2.5rem;
    }

    a {
        text-decoration: none;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: auto;
    }
`;

export const Btn = styled.button`
    margin-top: 0.5rem;
    padding: 0.6rem 2rem;
    border: none;
    border-radius: 10px;
    color: #fff;
    background: linear-gradient(135deg, #ff007f, #e60073);
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background 0.3s, transform 0.3s, box-shadow 0.3s;

    &:hover {
        background: linear-gradient(135deg, #ff3399, #ff66b2);
        transform: scale(1.06);
        box-shadow: 0 0 12px rgba(255, 0, 128, 0.4);
    }
`;


