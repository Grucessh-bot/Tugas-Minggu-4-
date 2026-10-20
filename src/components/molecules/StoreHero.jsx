import styled from "styled-components";
import { Link } from "react-router-dom";

const Hero = styled.section`
  position: relative;
  display: grid;
  min-height: 400px;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 0.78fr);
  align-items: center;
  gap: 30px;
  overflow: hidden;
  padding: clamp(32px, 7vw, 76px);
  border-radius: 22px;
  background:
    radial-gradient(ellipse at 82% 44%, rgb(224 133 95 / 25%), transparent 35%),
    linear-gradient(120deg, #252d27 0%, #303c34 57%, #41483f 100%);
  color: #faf8f3;

  @media (max-width: 700px) {
    min-height: 0;
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 34px 25px;
  }
`;

const Copy = styled.div`
  position: relative;
  z-index: 1;
  max-width: 590px;
`;

const Eyebrow = styled.p`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 18px;
  color: #efb28f;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 1.8px;
  text-transform: uppercase;

  &::before {
    width: 22px;
    height: 1px;
    background: currentColor;
    content: "";
  }
`;

const Title = styled.h1`
  max-width: 590px;
  margin: 0;
  font-size: clamp(39px, 6vw, 68px);
  font-weight: 620;
  letter-spacing: -4px;
  line-height: 0.99;

  span {
    color: #f1b38e;
    font-family: Georgia, serif;
    font-style: italic;
    font-weight: 450;
  }

  @media (max-width: 700px) {
    font-size: clamp(42px, 11vw, 58px);
    letter-spacing: -2.7px;
  }
`;

const Description = styled.p`
  max-width: 430px;
  margin: 19px 0 25px;
  color: #d2d5ce;
  font-size: 14px;
  line-height: 1.8;
`;

const HeroLink = styled(Link)`
  display: inline-flex;
  min-height: 45px;
  align-items: center;
  gap: 11px;
  padding: 0 18px;
  border-radius: 7px;
  background: #f0b18d;
  color: #242c26;
  font-size: 12px;
  font-weight: 720;
  text-decoration: none;
  transition: background 150ms ease, transform 150ms ease;

  &:hover {
    transform: translateY(-2px);
    background: #ffc39e;
  }
`;

const Visual = styled.div`
  position: relative;
  display: grid;
  min-height: 260px;
  place-items: center;

  &::before,
  &::after {
    position: absolute;
    border: 1px solid rgb(245 221 203 / 23%);
    border-radius: 50%;
    content: "";
  }

  &::before {
    width: 245px;
    height: 245px;
  }

  &::after {
    width: 188px;
    height: 188px;
  }

  @media (max-width: 700px) {
    min-height: 150px;
    justify-content: end;

    &::before {
      right: 34px;
      width: 150px;
      height: 150px;
    }

    &::after {
      right: 62px;
      width: 94px;
      height: 94px;
    }
  }
`;

const Device = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  width: 154px;
  height: 214px;
  place-items: center;
  border: 6px solid #d9ded7;
  border-radius: 25px;
  background:
    radial-gradient(ellipse at 55% 35%, rgb(255 229 202 / 74%), transparent 28%),
    linear-gradient(145deg, #d47657, #814941 62%, #383f3a);
  box-shadow: 21px 25px 34px rgb(0 0 0 / 28%);
  transform: rotate(9deg);

  &::before {
    position: absolute;
    top: 8px;
    width: 47px;
    height: 7px;
    border-radius: 0 0 7px 7px;
    background: #252d27;
    content: "";
  }

  &::after {
    width: 32px;
    height: 32px;
    border: 1px solid rgb(255 255 255 / 63%);
    border-radius: 50%;
    content: "";
  }

  @media (max-width: 700px) {
    position: absolute;
    right: 69px;
    width: 93px;
    height: 133px;
    border-width: 4px;
    border-radius: 17px;

    &::before {
      top: 5px;
      width: 31px;
      height: 5px;
    }

    &::after {
      width: 20px;
      height: 20px;
    }
  }
`;

function StoreHero() {
  return (
    <Hero>
      <Copy>
        <Eyebrow>Teknologi untuk keseharian</Eyebrow>
        <Title>Temukan perangkat <span>yang tepat.</span></Title>
        <Description>
          Pilihan smartphone, laptop, dan komputer untuk menemani ide hebatmu.
          Jelajahi koleksi pilihan Pajry Tech.
        </Description>
        <HeroLink to="/kategori/laptop">Jelajahi koleksi <span aria-hidden="true">→</span></HeroLink>
      </Copy>
      <Visual aria-hidden="true"><Device /></Visual>
    </Hero>
  );
}

export default StoreHero;
