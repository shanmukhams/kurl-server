function strToBinary(s)
{
    let n = s.length;
   
        for (let i = 0; i < n; i++)
        {
            let val = (s[i]).charCodeAt(0);
               
            // Convert ASCII value to binary
            let bin = "";
            while (val > 0)
            {
                if (val % 2 == 1)
                {
                    bin += '1';
                }
                else
                    bin += '0';
                val = Math.floor(val/2);
            }
            bin = reverse(bin);
   
            document.write(bin + " ");
        }
}
 
function reverse(input)
{
    a = input.split("");
        let l, r = 0;
        r = a.length - 1;
   
        for (l = 0; l < r; l++, r--)
        {
            // Swap values of l and r
            let temp = a[l];
            a[l] = a[r];
            a[r] = temp;
        }
        return (a).join("");
}

module.exports = strToBinary;