Estimado/a alumno/a,
A continuación, te detallo algunos aspectos importantes sobre tu proyecto final.

Criterios evaluadores cumplidos:
- Uso de tendencias actuales
- No existe uso de texto falso
- Proyecto entregado en fecha y hora
- No existe indicio de plagio
- Memoria con la información necesaria
- Archivos originales de diseño
- Tamaño del archivo final
- Sangrías y tabulaciones
- No se utiliza ningún "extra" en el proyecto
- URL para visualizar la web en un dominio
- Buenas optimizaciones en imágenes y vídeos
- No es Wordpress
- Uso correcto de la semántica de HTML
- Comentarios en HTML
- Comentarios en CSS
- Comentarios en Javascript Front

Aspectos destacados:
- Proyecto original (LMS)
- memoria completa
- Readme completo
- uso de Fetch (async/await) para obtener datos
- uso y procesamiento de markdown en html


Criterios evaluadores no cumplidos:

- Coherencia y unidad en el diseño
- El proyecto es 100% Responsive


Hola Liz, esperaba un proyecto con mucho contenido en JS, y así fue. Sin embargo, me costó un poco seguir la funcionalidad debido al uso de tantos elementos anidados. El código quedaría más limpio y fácil de mantener con el uso de funciones, handlers y template strings en lugar de createElement(). Además, como tu web es de cursos, debería estar más organizada en un grid que en un carousel, ya que si tienes muchos cursos, sería difícil navegar. En los cursos, es complicado entender la diferencia entre asignaturas, módulos y actividades. Tampoco entendí el tema de las ventajas y desventajas, ¿es informativo? ¿Estoy por anotarme en un curso o ya lo estoy haciendo? ¿Qué te parece agregar un filtro para buscar cursos por categoría o título? Para mejorar la usabilidad, te recomiendo crear lo que se llaman "user stories", en las que trazas el uso de tu web desde la perspectiva de un usuario. Esto te ayudará a asegurar que la web ofrece la experiencia y funcionalidad que deseas. Por ejemplo: "Lucía esta buscando desde su ordenador, un curso de seguridad en redes, revisa el catalogo, filtra los cursos que le interesan, y se anota el Master de Seguridad en Redes". O "Alfonso esta haciendo el curso de programación y desde su móvil todos los días hace 1 módulo mientras esta en el autobús". Además te agrego algunos puntos que he notado en tu proyecto, pero lo más importante es lo que te menciono sobre la funcionalidad. ¡Ánimo!


Aspectos a mejorar:

- Funcionalidad general del proyecto.
- CSS responsive: en tamaños intermedios de pantalla, las activities hacen overflow de contenido, sobre todo en la parte de Advantages/Disadvantages.
- CSS responsive: en tamaños intermedios de pantalla, las tarjetas de cursos vuelan sobre la descripción o información general de la web. Tampoco aparecen los botones o scroll para ver los cursos en los laterales.
- CSS: falta de cursores y hover sobre elementos cliqueables.
- CSS: Algunas transitions en los acordeons para que no aparezca el texto de golpe mejoraría la UX.
- CSS: Footer: Legacy ..? esto como los TyC podrían ser un link mucho mas pequeño.
- CSS: Hay modo oscuro? porque veo las clases en CSS pero no encontre como aplicarlo.
- JS: Carousels en Home: El imageCarousel utiliza botones de next/prev y no funcionan. El MainCourses, implementa uno con HTML y otro con JS, los de comments usan medidas fijas como 900px en vez de %. Calculo de Width en cada ejecución de updateSlider() innecesario. Podías crear una única función de Slider donde le envías los Ids de cada uno, y para todos reutilizas tus botones de next/prev,los mostras o nó, etc. ej: createSlider("#Comments", showButtons, autoPlay)
- JS: En comentarios, Cada vez que el carousel llega al último elemento agrega un botón extra de Next.
- JS: Función toggleMenu() sin uso.
- JSON: en los objetos JS y Json los índices de nuestros elementos suelen ser propiedades genéricas por ejemplo Lesson, o Content, no se usan valores específicos como "Lesson3", o "EventDrivenArchitecture". Esto previene reuitilizar el código. Si content es un array a cada item le das un title y description. Creo que lo haz aplicado en courses_new.json, pero en ese caso quita los archivos que no utilizas del proyecto.
- Comentarios: a que cursos se refieren? para que sirve el Not Helpfull? donde se crean estos comentarios?
- HTML: con acceso a todo el DOM, podemos manipular etiquetas como el title del header para que muestre el nombre del curso seleccionado.


### Cambios de mejora a realizar
  - ## Cambios JS 
     - Homogenizar el header
     - Agregar funcionalidad para el modo obscuro
     - Agregar funcionalidad de boton adelante atras del carousel principal
     - Revisar comportamiento del carousel que agrega un boton de next
     - Revisar funcion toggle menu
 - ## Cambios CSS
     - Revisar reponsive en pantallas intermedias
     - Agregar cursoser y hover en los botones faltantes
     - Agregar transitions en acordeones
     - Revisar legacy o eliminarlo
  - ## User Stories
    - modificar flujo de app
    - agregar un register
    - agregar un login

    # Colores
     432061 -> Backs
     f6f6f6 -> texto
     6bffcb ->
     1f1d25 ->