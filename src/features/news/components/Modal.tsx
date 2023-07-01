import { INormalizedNews } from "../type"
import { CloseButton, ModalCard, ModalContainer, ModalDescription, ImageModal, ModalTitle, SubscribeButton, ContainerText }from "../styled"
import { SuscribeImage, CloseButton as Close } from "../../../assets"

interface ModalProps {
    modal: INormalizedNews,
    setModal: React.Dispatch<React.SetStateAction<INormalizedNews | null>>
}

export const Modal= ({ modal, setModal }: ModalProps) => {

    const closeModal = () => {
        setModal(null)
    };

    const handleSubcribe = () => {
        setTimeout(() => {
            alert("Suscripto!");
            setModal(null);
          }, 1000)
    }

    if (modal.esPremium ) {
        return (
            <ModalContainer>
              <ModalCard>
                <CloseButton onClick={closeModal}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImageModal src={SuscribeImage} alt="mr-burns-excelent" />
                <ContainerText>
                  <ModalTitle>Suscríbete a nuestro Newsletter</ModalTitle>
                  <ModalDescription>
                    Suscríbete a nuestro newsletter y recibe noticias de
                    nuestros personajes favoritos.
                  </ModalDescription>
                  <SubscribeButton onClick={handleSubcribe}>
                    Suscríbete
                  </SubscribeButton>
                </ContainerText>
              </ModalCard>
            </ModalContainer>
        );
    }
    else {
        return(
            <ModalContainer>
              <ModalCard>
                <CloseButton onClick={() => setModal(null)}>
                  <img src={Close} alt="close-button" />
                </CloseButton>
                <ImageModal src={modal.imagen} alt="news-image" />
                <ContainerText>
                  <ModalTitle>{modal.titulo}</ModalTitle>
                  <ModalDescription>{modal.descripcion}</ModalDescription>
                </ContainerText>
              </ModalCard>
            </ModalContainer>
        )

    }
};

