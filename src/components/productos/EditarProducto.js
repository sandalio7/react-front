import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const EditarProducto = () => {
  const { id } = useParams();
  console.log(id);
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState('');

  const URL = process.env.REACT_APP_API_URL + "/" + id;

  useEffect(async () => {
    try {
      //consultar 1 producto en particular, peticion GET
      const respuesta = await fetch(URL);
      // console.log(respuesta);
      if (respuesta.status === 200) {
        const dato = await respuesta.json();
        // console.log(dato)
        setProducto(dato);
        setCategoria(dato.categoria);
      }
    } catch (error) {
      console.log(error);
      //mostrar un mensaje al usuario
    }
  }, []);

  return (
    <Container>
      <h1 className="display-3 text-center my-4">Editar Producto</h1>
      <hr />
      <Form className="my-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: café"
            defaultValue={producto.nombreProducto}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="ej: 50"
            defaultValue={producto.precioProducto}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
            <option value="">Seleccione una opcion</option>
            <option value="bebida-caliente">Bebida Caliente</option>
            <option value="bebida-fria">Bebida Fria</option>
            <option value="sandwich">Sandwich</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarProducto;
