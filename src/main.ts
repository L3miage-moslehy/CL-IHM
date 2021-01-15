import './utils';
import { LogTests } from './utils';

/***********************************************************************************************************************
 * Fonction qui renvoie le minimum de deux nombres
 */
function min(a: number, b: number): number {
    return a < b ? a : b; // Math.min(a, b)
}
LogTests("Fonction qui renvoie le minimum de deux nombres", min, "min", [
    {args: [17, 27], expectedResult: 17},
    {args: [17, 15], expectedResult: 15},
]);









/***********************************************************************************************************************
 * Fonction qui trie des nombres par ordre croissant
 */
function triCroissant(...L: Readonly<number[]>): number[] {
    return L.slice().sort( (a, b) => a - b );
}
LogTests("Fonction qui trie des nombres par ordre croissant", triCroissant, "triCroissant", [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: [-38, -21, -6, 16, 44, 51, 59, 63, 64, 95]},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: [-98, -60, -52, -40, -23, -12, -4, 23, 29, 40]},
    {args: [], expectedResult: []}
]);

/***********************************************************************************************************************
 * Fonction qui trie des nombres par ordre décroissant
 */
function triDécroissant(...L: Readonly<number[]>): number[] {
    return triCroissant(...L).reverse();
}
LogTests("Fonction qui trie des nombres par ordre décroissant", triDécroissant, 'triDécroissant', [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: [95, 64, 63, 59, 51, 44, 16, -6, -21, -38]},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: [40, 29, 23, -4, -12, -23, -40, -52, -60, -98]},
    {args: [10], expectedResult: [10]},
    {args: [], expectedResult: []}
]);

/***********************************************************************************************************************
 * Fonction qui somme
 */
function Somme(...L: Readonly<number[]>): number {
    if (L.length > 0) {
        return L.reduce( (acc, x) => acc + x );
    } else {
        throw "Impossible de sommer un tableau vide";
    }
}
LogTests("Fonction qui somme", Somme, "Somme", [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: 327},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: -197},
    {args: [10], expectedResult: 10},
    {args: [], expectedResult: "Impossible de sommer un tableau vide", errorExpected: true}
]);


/***********************************************************************************************************************
 * Fonction qui fait la moyenne
 */
function Moyenne(...L: Readonly<number[]>): number {
    if (L.length > 0) {
        return Somme(...L) / L.length;
    } else {
        throw "Impossible de faire la moyenne d'un tableau vide";
    }
}
LogTests("Fonction qui fait la moyenne", Moyenne, "Moyenne", [
    {args: [59, 51, 63, 95, 64, -38, -21, -6, 16, 44], expectedResult: 32.7},
    {args: [23, 29, -12, -23, 40, -4, -40, -60, -98, -52], expectedResult: -19.7},
    {args: [10], expectedResult: 10},
    {args: [], expectedResult: "Impossible de faire la moyenne d'un tableau vide", errorExpected: true}
]);

/***********************************************************************************************************************
 * Fonction qui renvoie les nombres strictement supérieurs à un certain seuil
 * et triés par ordre croissant
 */
function NombresSupérieursA(min: number, notes: Readonly<number[]>): number[] {
    return triCroissant( ...notes.filter( x => x > min ) );
}
LogTests("Les nombres strictement supérieurs à un certain seuil", NombresSupérieursA, "NombresSupérieursA", [
    {args: [10, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16, 44, 51, 59, 63, 64, 95]},
    {args: [20, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [44, 51, 59, 63, 64, 95]},
    {args: [50, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [51, 59, 63, 64, 95]},
    {args: [50, [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: []},
    {args: [10, []], expectedResult: []}
]);

/***********************************************************************************************************************
 * Fonction qui renvoie les nombres strictement compris entre une valeur minimale et une valeur maximale
 * et triés par ordre croissant
 */
function NombresComprisEntre(min: number, max: number, notes: Readonly<number[]>): number[] {
    return triCroissant( ...notes.filter( x => (x > min) && (x < max) ) );
}
LogTests("Les nombres strictement compris entre une valeur minimale et maximale", NombresComprisEntre, "NombresComprisEntre", [
    {args: [10, 20, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16]},
    {args: [0, 100, [59, 51, 63, 95, 64, -38, -21, -6, 16, 44]], expectedResult: [16, 44, 51, 59, 63, 64, 95]},
    {args: [10, 20, [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]], expectedResult: []},
    {args: [10, 20, []], expectedResult: []}
]);


/***********************************************************************************************************************
 * Coder la méthode zip
 * Prends en paramètre des tableaux, renvoie un tableau.
 * Chaque élément du tableau résultat à l'index i contient le tableaux les éléments d'indexes i des tableaux d'entrées.
 * exemple
 * L1 = [a, b, c]
 * L2 = [1, 2, 3]
 * L3 = [x, y, z]
 * zip(L1, L2, L3) = [
 *   [a, 1, x],
 *   [b, 2, y],
 *   [c, 3, z]
 * ]
 */
type ReadOnlyMatrix<T> = Readonly<Readonly<T[]>[]>;
function Zip<T extends unknown[]>(...M: [...{ [P in keyof T]: readonly T[P][] }]): T[] {
// function Zip(...M: ReadOnlyMatrix<unknown>): unknown[][] {
    const VMAX = M.reduce( (vmax, v) => vmax.length > v.length ? vmax : v, []);
    return VMAX.map( (_, i) => M.map( v => v[i]) as T );
/*
    if(M.length===0){​​​​​
        return [];
    }​​​​​
    const V = M.reduce((max, currentValue) => {​​​​​if (max.length < currentValue.length) {​​​​​max = currentValue;}​​​​​ return max;}​​​​​ )
    const len = V.length;
    const T = new Array(len);
    for (let i = 0; i < len; i++){​​​​​
        T[i] = M.map(array=>array[i]);
    }​​​​​
    return T;
    */
}
Zip([1, 2, 3], ['a', 'b', 'c'], [true, false, false])

LogTests("Zip de tableaux", Zip, "Zip", [
    {args: [  ], expectedResult: []},
    {args: [ [1, 2, 3], ['a', 'b', 'c'] ], expectedResult: [[1, 'a'], [2, 'b'], [3, 'c']]},
    {args: [ [1, 2, 3], ['a', 'b', 'c'], [true, false, false] ], expectedResult: [[1, 'a', true], [2, 'b', false], [3, 'c', false]]},
    {args: [ [1], ['a', 'b', 'c'], [true, false, false] ], expectedResult: [[1, 'a', true], [undefined, 'b', false], [undefined, 'c', false]]},
    {args: [ [1, 2, 3], ['a', 'b', 'c'], ['x', 'y', 'z'], [true, false, true]], expectedResult: [[1, 'a', 'x', true], [2, 'b', 'y', false], [3, 'c', 'z', true]]},
]);


/***********************************************************************************************************************
 * Produit scalaire entre deux vecteurs
 */
function ProduitScalaire(V1: Readonly<number[]>, V2: Readonly<number[]>): number {
    if (V1.length !== 0 && V2.length !== 0) {
        if (V1.length === V2.length) {
            return Zip(V1, V2).reduce( (acc, [x, y]) => acc + x*y, 0 );
            // OU return V1.reduce( (acc, x, i) => acc + x * V2[i] , 0);
        } else throw "Les vecteurs doivent être de même taille";
    } else throw "Les vecteurs doivent être non vides";
}
LogTests("Produit scalaire entre deux vecteurs", ProduitScalaire, "ProduitScalaire", [
    {args: [[1, 1], [1, 1]], expectedResult: 2},
    {args: [[4, 1], [1, 3]], expectedResult: 7},
    {args: [[59, 51, 63, 95, 64, -38, -21, -6, 16, 44], [23, 29, -12, -23, 40, -4, -40, -60, -98, -52]],
        expectedResult: -49},
    {args: [[], [5]], expectedResult: "Les vecteurs doivent être non vides", errorExpected: true},
    {args: [[5], []], expectedResult: "Les vecteurs doivent être non vides", errorExpected: true},
    {args: [[2, 3], [4]], expectedResult: "Les vecteurs doivent être de même taille", errorExpected: true}
]);


/***********************************************************************************************************************
 * Addition de matrices
 */
function AjoutMatrices(M1: ReadOnlyMatrix<number>, M2: ReadOnlyMatrix<number>): number[][] {
    let M : number[][] = [];
    if (M1.length !== 0 && M2.length !== 0 && M1.every(l1 => l1.length !== 0) && M2.every(l2 => l2.length !== 0)) {
        if (M1.length === M2.length) {
            return M1.map( (V, i) => V.map( (x, j) => x + M2[i][j] ) );
        } else throw "Les matrices doivent être de même taille";
    } else throw "Les matrices doivent être non vides";
}

/* Solution 1
  M1.forEach((l1, i) => {
                M.push([]);
                l1.forEach((v1, j) => {
                    M[i].push(v1 + M2[i][j]);
                });
            });
            return M;
 */

/* SOlution 2
 if(M1.length===0 || M2.length===0){
        throw("Les matrices doivent être non vides")
    }
    if(M1.length!==M2.length){
        throw("Les matrices doivent être de même taille")
    }
    if(M1[0].length===0 || M2[0].length===0){
        throw("Les matrices doivent être non vides")
    }
return M1.map((V,i) => V.map((val,j) => val+M2[i][j]));
*/
LogTests("Addition de matrices", AjoutMatrices, "AjoutMatrices", [
    {args: [ [[1, 1], [1, 1]], [[1, 0], [0, 1]] ], expectedResult: [[2, 1], [1, 2]]},
    {args: [ [[1, 1], [1, 1]], [[1, 4], [0, 1]] ], expectedResult: [[2, 5], [1, 2]]},
    {args: [ [[1, 1], [1, 1], [1, 3]], [[1, -4], [0, 1], [65, -54]] ], expectedResult: [[2, -3], [1, 2], [66, -51]]},
    {args: [ [[1, 1], [1, 1]], [] ], expectedResult: "Les matrices doivent être non vides", errorExpected: true},
    {args: [ [[1, 1], [1, 1]], [5] ], expectedResult: "Les matrices doivent être de même taille", errorExpected: true},
    {args: [ [5], [[1, 1], [1, 1]] ], expectedResult: "Les matrices doivent être de même taille", errorExpected: true},
    {args: [ [[1, 1], [1, 1]], [[], []] ], expectedResult: "Les matrices doivent être non vides", errorExpected: true},
    {args: [ [[], []], [[1, 1], [1, 1]] ], expectedResult: "Les matrices doivent être non vides", errorExpected: true},
    {args: [[], [[5]]], expectedResult: "Les matrices doivent être non vides", errorExpected: true}
]);



/***********************************************************************************************************************
 * Codez une classe Matrice implémentant l'ajout et la multiplication de matrices.
 */


