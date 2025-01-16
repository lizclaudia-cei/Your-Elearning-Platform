/**
 * Funcion para tarer los cursos desde el courses.json
 */

async function getCourses() {
 try{
    let courses = await fetch('./jsons/courses.json');
    courses = await courses.json();
    console.log('Estos son los cursos');
    console.log(courses);

 }catch(error){
     console.error(error);
 }
}