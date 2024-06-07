import NewCard from "../Components/NewCard";

const img1 =
  "https://img.freepik.com/foto-gratis/colores-vibrantes-que-arremolinan-caos-submarino-futurista-generado-ia_188544-9692.jpg?t=st=1715615922~exp=1715619522~hmac=2a7edb0de9b1ac1622a7c3b3c607c4861fefb62f1018d70f47e4f53cf0a95a73&w=1380";

const img2 =
  "https://img.freepik.com/foto-gratis/joven-mujer-feliz-sueter_23-2148012141.jpg?t=st=1715716196~exp=1715719796~hmac=aa222fed98c7d15189348f9bd07c14d64b1762820c9ab420e3d3553c6481078b&w=740";

const text1 = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae itaque esse, sunt voluptatum consectetur voluptates in voluptas excepturi aut sequi iste atque nemo, culpa maxime fugiat quaerat exercitationem cum consequatur!`;

const News = () => {
  return (
    <section className="lg:w-2/4 lg:border-r-2 w-96 m-auto pt-28">
      <h1 className="text-4xl font-bold pb-2 m-auto">Helloooo!</h1>
      <NewCard
        lastPublish="Last publish 4/13/24 4:00 pm"
        user="SpookyD"
        img={img1}
        text={text1}
        key={1}
      />
      <NewCard
        lastPublish="Last publish 4/13/24 4:00 pm"
        user="Norman"
        img={img2}
        text={text1}
        key={2}
      />
      <NewCard
        lastPublish="Last publish 4/13/24 4:00 pm"
        user="SpookyD"
        img={img1}
        text={text1}
        key={3}
      />
      <NewCard
        lastPublish="Last publish 4/13/24 4:00 pm"
        user="Norman"
        img={img2}
        text={text1}
        key={4}
      />
    </section>
  );
};

export default News;
