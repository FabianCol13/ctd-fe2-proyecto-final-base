import { screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Cita from './Cita';
import { API_URL } from '../../app/constants';
import { render } from '../../test-utils';
import userEvent from '@testing-library/user-event'

const data = [
    {
        quote: "Oh, so they have Internet on computers now!",
        character: "Homer Simpson",
        image: "imagen",
        characterDirection: "Right"
    },
    {
        quote: "You're turning me into a criminal when all I want to be is a petty thug.",
        character: "Bart Simpson",
        image: "imagen",
        characterDirection: "Right"
    },
    {
        quote:"Ahh! Sweet liquor eases the pain.",
        character: "Troy McClure",
        image: "imagen",
        characterDirection: "right",
    },
]

const validQueries = data.find((q) => q.character)

const handlers = [
    rest.get(`${ API_URL }`, (req, res, ctx) => {
        const character = req.url.searchParams.get("character");

        if(character === null) {
            return res(ctx.json([data[1]]), ctx.delay(200));
        }

        if(validQueries) {
            return res(ctx.json([validQueries]));
        }

        return res(ctx.json([]), ctx.delay(200));
    })
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Cita', () => {
    describe("Cuando se apreta el btn aleatorio sin ningun nombre de personaje", () => {
        it('Deberia mostrar la cita en la posicion 2', async () => {
          render( <Cita /> );
          const obtenerCitaButton = await screen.findByLabelText('Obtener cita aleatoria');
          userEvent.click(obtenerCitaButton)
          await waitFor(() => {
            expect(screen.getByText("You're turning me into a criminal when all I want to be is a petty thug.")).toBeInTheDocument();
          });
        });
    })

    describe("Cuando se coloca un personaje y darle al btn de obtener cita ", () => {
        it('Me debe dar la cita correspondiente al personaje buscado y al darl al brn de obtener cita', async () => {
            render( <Cita /> );
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            const obtenerCitaButton = await screen.findByLabelText(/Obtener Cita/i);
            await userEvent.click(input);
            await userEvent.keyboard("Homer")
            await userEvent.click(obtenerCitaButton);
            await waitFor(() => {
              expect(screen.getByText("Oh, so they have Internet on computers now!")).toBeInTheDocument();
            });
          });    
    })

    describe("Cuando se le da al btn de borrar", () => {
        it('Limpiar la cita y el personaje buscado cuando se le de al btn borrar', async () => {
            render( <Cita /> );
            const input = screen.getByRole("textbox", { name: "Author Cita" });
            const obtenerCitaButton = await screen.findByLabelText(/Obtener Cita/i);
            const borrarButton = screen.getByLabelText('Borrar');
            await userEvent.click(input);
            await userEvent.keyboard("Homer Simpson")
            userEvent.click(obtenerCitaButton);
            await waitFor(() => {
                expect(screen.getByText("Oh, so they have Internet on computers now!")).toBeInTheDocument();
            });

            userEvent.click(borrarButton);
            await waitFor(() => {
                expect(screen.getByText(/No se encontro ninguna cita/i)).toBeInTheDocument();
            });

            await waitFor(() => {
                expect(screen.getByDisplayValue("")).toBeInTheDocument();
            });
        });
    })
});
