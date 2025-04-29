
// 1. Escribir una consulta para mostrar todos los documentos en la colección Restaurants
db.restaurants.find();


// 2. Escribir una consulta para mostrar el restaurant_id, name, borough y cuisine para todos los documentos en la colección Restaurants
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 3. Escribir una consulta para mostrar el restaurant_id, name, borough y cuisine, pero excluir el campo _id para todos los documentos en la colección Restaurants
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 });


// 4. Escribir una consulta para mostrar restaurant_id, name, borough y zip code, pero excluir el campo _id para todos los documentos en la colección Restaurants
db.restaurants.find({}, { restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1, _id: 0 });


// 5. Escribir una consulta para mostrar todos los restaurantes que están en el Bronx
db.restaurants.find({ borough: "Bronx" });


// 6. Escribir una consulta para mostrar los primeros 5 restaurantes que están en el Bronx.
db.restaurants.find({ borough: "Bronx" }).limit(5);


// 7. Escribir una consulta para mostrar los próximos 5 restaurantes después de saltar los primeros 5 del Bronx
db.restaurants.find({ borough: "Bronx" }).skip(5).limit(5);


// 8. Escribir una consulta para encontrar los restaurantes que tienen un score de más de 90
db.restaurants.find({ "grades.score": { $gt: 90 } });


// 9. Escribir una consulta para encontrar los restaurantes que tienen un score de más de 80 pero menor que 100.
db.restaurants.find({ "grades.score": { $gt: 80, $lt: 100 } });


// 10. Escribir una consulta para encontrar los restaurantes que se localizan en valor de latitud menor de -95.754168
db.restaurants.find({ "address.coord.0": { $lt: -95.754168 } });


// 11. Escribir una consulta de MongoDB para encontrar los restaurantes que no preparan ninguna cuisine de 'American' y su calificación es superior a 70 y longitud menor de -65.754168

// Creo que este ejercicio está mal el enunciado. Porque si buscas por latitud sí que te muestra restaurantes pero por longitud no
db.restaurants.find({ 
    cuisine: { $ne: "American" } , 
    "grades.score": { $gt: 70 },
    "address.coord.1": { $lt: -65.754168 } 
});


// 12. Escribir una consulta para encontrar los restaurantes que no preparan ninguna cuisine de 'American' y han obtenido un marcador más de 70 y localizados en la longitud menor que -65.754168. Nota: Hacer esta consulta sin utilizar el operador $and

// Lo mismo que el comentario anterior
db.restaurants.find({ 
    cuisine: { $ne: "American" } , 
    "grades.score": { $gt: 70 },
    "address.coord.1": { $lt: -65.754168 } 
});


// 13. Escribir una consulta para encontrar los restaurantes que no preparan ninguna cuisine de 'American' y han obtenido un grado 'A' no pertenecen a Brooklyn. Se debe mostrar el documento según la cuisine en orden descendente
db.restaurants.find({
    cuisine: { $ne: "American" },
    "grades.grade": "A",
    borough: { $ne: "Brooklyn" }
}).sort({ cuisine: -1 });


// 14. Escribir una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes que contienen 'Wil' como las tres primeras letras en su nombre
db.restaurants.find({ name: /^Wil/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 15. Escribir una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes que contienen 'ces' como las últimas tres letras en su nombre
db.restaurants.find({ name: /ces$/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 16. Escribir una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes que contienen 'Reg' como tres letras en algún lugar en su nombre
db.restaurants.find({ name: /Reg/ }, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });


// 17. Escribir una consulta para encontrar los restaurantes que pertenecen al Bronx y preparan cualquier plato americano o chino
db.restaurants.find({ borough: "Bronx", cuisine: { $in: ["American", "Chinese"] } });


// 18. Escribir una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes que pertenecen a Staten Island o Queens o Bronx o Brooklyn
db.restaurants.find({ 
    borough: { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } 
}, { 
    restaurant_id: 1, name: 1, borough: 1, cuisine: 1
});


// 19. Escribir una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes que no pertenecen a Staten Island o Queens o Bronx o Brooklyn
db.restaurants.find({ 
    borough: { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"] } 
}, { 
    restaurant_id: 1, name: 1, borough: 1, cuisine: 1
});


// 20. Escribir una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes que obtengan un marcador que no sea más de 10
db.restaurants.find({
    "grades.score": { $lt: 10 } 
}, {
    restaurant_id: 1, name: 1, borough: 1, cuisine: 1
});


// 21. Escribir una consulta para encontrar el restaurant_id, name, borough y cuisine para aquellos restaurantes que preparen pescado excepto 'American' y 'Chinese' o el name del restaurante comience con letras 'Wil
// No he visto por ninguna lado que haya una 'cuisine: Fish'. No lo he incluído en la query
db.restaurants.find({
    cuisine: { $nin: ["American", "Chinese"] },
    name: /^Wil/    
}, {
    restaurant_id: 1, name: 1, borough: 1, cuisine: 1
});


// 22. Escribir una consulta para encontrar el restaurant_id, name, y grades para aquellos restaurantes que obtengan un grado "A" y un score 11 en datos de estudio ISODate "2014-08-11T00:00:00Z"
db.restaurants.find({
    "grades.grade": "A",
    "grades.score": 11,
    "grades.date": ISODate("2014-08-11T00:00:00Z")
}, {
    restaurant_id: 1, name: 1, grades: 1
});


// 23. Escribir una consulta para encontrar el restaurant_id, name y grades para aquellos restaurantes donde el 2º elemento de variedad de grades contiene un grado de "A" y marcador 9 sobre un ISODate "2014-08-11T00:00:00Z"

// No devuelve nada, pero no tengo claro que el problema sea la query necesariamente
db.restaurants.find({
    "grades.2.grade": "A",
    "grades.2.score": 9,
    "grades.2.date": ISODate("2014-08-11T00:00:00Z")        
}, {
    restaurant_id: 1, name: 1, grades: 1    
});


// 24. Escribir una consulta para encontrar el restaurant_id, name, dirección y ubicación geográfica para aquellos restaurantes donde el segundo elemento del array coord contiene un valor que es más de 42 y hasta 52
db.restaurants.find({
    "address.coord.1": { $gt: 42, $lt: 52 }
}, {
    restaurant_id: 1, name: 1, address: 1  
});


// 25. Escribir una consulta para organizar el nombre de los restaurantes en orden ascendente junto con todas las columnas
db.restaurants.find().sort({ name: 1 });


// 26. Escribir una consulta para organizar el nombre de los restaurantes en orden descendente junto con todas las columnas
db.restaurants.find().sort({ name: -1 });


// 27. Escribir una consulta para organizar el nombre de la cuisine en orden ascendente y por el mismo barrio de cuisine. Orden descendente
db.restaurants.find().sort({ cuisine: 1, borough: -1 });


// 28. Escribir una consulta para saber todas las direcciones que no contienen la calle

// No devuelve ningún documento
db.restaurants.find({ "address.street": null });


// 29. Escribir una consulta que seleccionará todos los documentos en la colección de restaurantes donde el valor del campo coord es Double
db.restaurants.find({ "address.coord": { $type: "double" } });


// 30. Escribir una consulta que seleccionará el restaurant_id, name y grade para aquellos restaurantes que retornen 0 como resto después de dividir el marcador por 7


// 31. Escribir una consulta para encontrar el name de restaurant, borough, longitud y altitud y cuisine para aquellos restaurantes que contienen 'mon' como tres letras en algún lugar de su nombre
db.restaurants.find({
    name: /mon/
}, {
    name: 1, borough: 1, "address.coord": 1, cuisine: 1
});


// 32. Escribir una consulta para encontrar el name de restaurant, borough, longitud y latitud y cuisine para aquellos restaurantes que contienen 'Mad' como primeras tres letras de su nombre
db.restaurants.find({
    name: /^Mad/
}, {
    name: 1, borough: 1, "address.coord": 1, cuisine: 1
});


