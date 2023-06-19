// customer {
//     id, name}
   
//     supplier {
//     id, name
//     }
       
//     items {
//     id , name,
//     rating, supplier_id
//     }
       
//     purchased_items: {
//     id, 
//     item_id,
//     customer_id, 
//     date_purchased
//     }
       
//     q1 . find all  customer's name along with count  who have purchased item with name "iphone" with supplier name "Apple"    
//     q2. name of all the items whose rating is grater than avg rating and having supplier id 2
//     q4. diff between stored_procedure and function. When they should be used.


const query = `SELECT c.name, COUNT(c.id) FROM customer c
INNER JOIN purchased_items p ON c.id = p.customer_id
INNER JOIN items i ON p.item_id = i.id
INNER JOIN supplier s ON i.supplier_id = s.id
WHERE i.name ILIKE '%iphone%' AND s.name ILIKE '%Apple%'
GROUP BY c.name;
`;

const query2 = `SELECT i.name FROM items i
WHERE i.rating > (SELECT AVG(rating) FROM items WHERE supplier_id = 2) AND i.supplier_id = 2`;

// In PostgreSQL, both stored procedures and user-defined functions are created with CREATE FUNCTION statement.
// 	---------------------------------------------------------------------------------------------------------------------------------  //
// Qualities                         Stored Procedure        Function
// Use in an expression		            No                     Yes
// Return a value		                No                     Yes
// Return values as OUT parameters	    Yes                    No
// Return a single result set		    Yes                    Yes  (as a table function)
// Return multiple result sets	        Yes                    No



