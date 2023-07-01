import { NewsCard, NewsCardDate, NewsCardDescription, NewsCardImage, NewsCardTitle, ReadButton } from "../styled"
import { INormalizedNews } from "../type"


interface TarjetaProps {
    noticia: INormalizedNews,
    setModal: React.Dispatch<React.SetStateAction<INormalizedNews | null>>,
}

export const Card = ({ noticia, setModal }: TarjetaProps) => {
    const handleClick = () => {
        setModal(noticia);
      };

    return(
        <NewsCard>
            <NewsCardImage src={noticia.imagen} />
            <NewsCardTitle>{noticia.titulo}</NewsCardTitle>
            <NewsCardDate>{noticia.fecha}</NewsCardDate>
            <NewsCardDescription>{noticia.descripcionCorta}</NewsCardDescription>
            <ReadButton onClick={handleClick}>Ver más</ReadButton>
          </NewsCard>
    )
}
