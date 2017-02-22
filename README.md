# Exchange sort algorithms visualized via JavaScript
Here comb sort, Bubble sort & Cocktail Shake sort visualized via 3 graph. methods.

<a href ="https://www.youtube.com/watch?v=o6XBlRUC91Y&list=PLDQRlrYrh6yquu2mhKp6KPVtuvZ1cjL46">Video</a>
&
<a href ="https://alexvaganov.bitbucket.io">Demo</a>

or download/clone repo & run index.html file for take your exp.
Chrome, MS Edje, MF (recomended) & Safari supported
<img src="http://i.imgur.com/qdyv0cd.png">
<b>Bubble sort</b>, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list to be sorted, compares each pair of adjacent items and swaps them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list. Although the algorithm is simple, it is too slow and impractical for most problems even when compared to insertion sort. It can be practical if the input is usually in sorted order but may occasionally have some out-of-order elements nearly in position. <a href = "https://en.wikipedia.org/wiki/Bubble_sort">[1]</a>

<b>Cocktail shaker sort</b> also known as bidirectional bubble sortcocktail sort, martini sort, shaker sort (which can also refer to a variant of selection sort), ripple sort, shuffle sort  or shuttle sort, is a variation of bubble sort that is both a stable sorting algorithm and a comparison sort. The algorithm differs from a bubble sort in that it sorts in both directions on each pass through the list.<a href = "https://en.wikipedia.org/wiki/Cocktail_shaker_sort">[2]</a>

<b>Comb sort</b>. The basic idea is to eliminate turtles, or small values near the end of the list, since in a bubble sort these slow the sorting down tremendously. Rabbits, large values around the beginning of the list, do not pose a problem in bubble sort.
In bubble sort when any two elements are compared, they always have a gap (distance from each other) of 1. The basic idea of comb sort is that the gap can be much more than 1. The inner loop of bubble sort, which does the actual swap, is modified such that gap between swapped elements goes down (for each iteration of outer loop) in steps of a "shrink factor" k: [ n/k, n/k2, n/k3, ..., 1 ]. <a href = "https://en.wikipedia.org/wiki/Comb_sort">[3]</a>
