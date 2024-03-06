"use client";
import { Avatar } from "antd";
import React, { useState } from "react";

const users = [
  {
    id: 1,
    name: "User 1",
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },

  {
    id: 3,
    name: "User 3",
    avatar:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  },
  {
    id: 1,
    name: "User 1",
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
  {
    id: 1,
    name: "User 1",
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
  {
    id: 2,
    name: "User 2",
    avatar:
      "data:image/png;base64,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",
  },
  {
    id: 3,
    name: "User 3",
    avatar:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  },
  {
    id: 1,
    name: "User 1",
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
  {
    id: 1,
    name: "User 1",
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
  {
    id: 2,
    name: "User 2",
    avatar:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAAB71BMVEX3wC/////RpCcREiQAAAAYAABUIgcqBQD5qnH8zaEBsI9WwrUAACSzjSbTpif6wi/ilmLwv5YmAAD5tYAArIgpAADZ6+nG5+EjtZxIv7EUAAAiAAD/rnQcAAAtDgTmo3QAABcNAADOngD/1af2vh7brYgAAByUlJr8+Ov657n66cHbqygwAAC8flQAABj53p7X09L54aju4L5NFwB6bWvk5OQAAAx7e4IfIC/3xUD1uwn2yVH303j4zWb42pP41IFTUlL779K2rq07EgNGGQZIDgDiypD38eJCAADXk2Knckx8VjllVlXIiV1ePyvPpoLCwMHr6+vplF9AbmQuFxMFm33fwXfTq0LXs1eNjZXV1dlBQUwdHSxbW2SglpWko6I9JiREQ0MlJCNYREKRhoTm06UzMTJsXVuAdXNtRzFKLR68j2w2HhPSqTeSZUhhMxtzTTprSjuge2AnGBOQYUFSLCLJp4evo42QdEh3VRxxUS6Ldm27lVileiVrPRGhgW3RqWjbxbS5fQC/oXI+IwiCZVTAtK6SURaPWzGabR+te1mcYjJmRRXGlUH92rvo3dO0u52vrHpknIwwo5p5pHxlr4kwPjcAPzIHXkv3qYr0glz0xar0kG74zMHutJ3qm3/aXj6VwKoGeGEEJB0GZFH3tO4OAAAVGUlEQVR4nO2di18T17bHSTKRBG/Jg869t5MEEwhJREDklQhoG1AR0jywiiYxUBXbClQFtOd19bT0INZzWtvS24en1bb3/qF375lJMpPM3ntNMgl4bn7ngwUOZvi61v7ttdfeM2lra6mlllpqqaWWWmqppZZaaqmlllpqSa8cwWBwcnIy2Hb69OmpKfSHA32Jvhd0HPRvVrswUXDq7ZPH++cikYhJFvo03n/85NtTQcx30L+jXqE4OaamT8VLOFqKxE9NTzleo9ihQEyd7acylTXXf3bqtYicYzI4fRwIVQrd8WmUl4c5cI5g23S/Pqii+qfbDi1aMHhGb6zUcTtzKFMyGDw7VzuVpLmzhw3NETx9ql4qSadOH6KMdASnahxZWuqfOiRojkkjsSS0yYOGQgq2HTcWC+v46YMea0HHSeOxsE46DhRtcroOf6crMn1w+RhsM3hwqdXfdkBBC77dSCystw+CDBSuxeHMzDLSzPCw8jurq+GVzPA4++8fQNCCZ1ija3Fm7H23EBCsVqsgBHyXb60sLi7f4BS6OTazyHiRyJnmkjmCrELjybuc4HPz7UXxbo+V09A7GcYLnWommcMRp/82y+8HPO1VCmiRcTdX6K8VdzStEAlO0dNw5rLgLtG4ZRHBENoM9eUiU00KWnCa+nuM3+JkLJSJ3bPnzh1BOnfu3KwIFhBkBZSYN+hGMt0Ussmz9HB55CR0t8+KTGV1i05SlhKOHrSzTZisJ+m2sRpwy1gVVBhMzSWxFclWqS97quFkQXrJOxYQjZDXwNIEU6CNUV/4eGOz0RGkz8ofCpK3z2pgEcAQGoisv5FkjuAIPV6ClIWaWEQwqzUAI2uY7bO4VgMil3a4aGDFoNHHWeNi1kPnmhHHFyEN6WBFMro3Hm+Igzjaem5TLzvuw37o1nINNliRjD6fNcIbEdcF6kVN73uoecgAk8k+oF/jrPHZeKJniX7NZYGehywwmSxMv4rBNYijrdN8lX7FcR8eYN00LgaY7I2MVZqhdaOjzWw2M5ZfH/qwI1K5WGASWYF+nYiBXG0nzOaeOP16GY5hHBAwacE2TL9S3LiQYS66IZpMtzwM4wCBicPsBuNSBlmjmIad1xgXEwPGSEQAmJSMjJCZjOkWoHCZzR+z+hs4YDwjESFgYjK+w7hY5LRRXIyKw2QatvIsRxTBAkwwMRlzjMvVXVuJaYi4GDOYyfSRj+0cSJ4UmwyDRVnXq7ffKIYLjTDWdRY9oIAdmU1ysJCxmnKm+sIlczETEVW/oICNPrVxsFFGr4WR+mt3RjkNUbyYiShaByBg549577BDFgDYRz2llRwuBMbcT1nkIJZ4ZDTR5QXkohWUizUXICUuVk2PNCMA5jAUsHSXzbbGto8AJBdNJ2sLmbkULzPzEmImsooOpHv2Lpt3EBYydi6a2vQ3ChylcEGcA3miu909yuS62NeLIuYFhoyZi7UspxVcrMUKViYAycTRRK8dg83D7IO1VYE0pS9keOmlK2Di7MzOxFGXHYPZvAkmmQCZo3XXH8pwmc2s4hfrlhswiZ1f75XAbLYNZjIG2CU+lq6QqbkgARsXeHYmjibsdhkMkIwB9kIaCx4ydRriqh7w74bLDnYm2ktgNu8Ci0yADTITuMpXhwuwvMRa9bFn5/N9CjAbu/5g9k4lQfv5lVzs6hcLDzEWV7pXCYamaQYZcJABa+HOSi5A0YHEMc3+4rrEVQZjGQgeZJBrA9qMjqpwITDI+cPhAKsAvvhM5lKAOS9TyQRAgwBrjg2mwcVsdIhasTK843yJSwHmdW7QshGDMbbcJZ2hO36VG4K93mQaY3hHKQ9VYCwyBPYR5Op0+9BKQ1z+gs5/vU+fni+my1xKMJuX6iDsLr4k+upFkwuywMTy8BRTHD3Sp+BSgYmuT1xPQ92DuuDUSkNwJor9KeLwuuOy24lgeKambXFC3IPWI9DGQmCgf7EMZZF58a7dTgOzeZNWQjoCC3wkcsQIXMBMXCGD3Uv39lLAvFi2O9q2D7ZFSi6SAgbKRLxm4bXBRu9vbW2l+1x2DVfESPPJhQeJRGJbMxsFqC1SfJEEBjsT+y6pQTU7wLvdHp9n4OH9dbu68vB65x+slc/kaB7+gLUHkCI6wWCzM6nzNnoeIbndPvQHz/M+666rt7xssS1UHharTkcBsOsia0ofGKxONC1edlcXHufvJbbWkdLp9Pru5qzVPeD2bRXBvMkNEWY7lViQlLizUcWGwW6y+x5YxHqxriE2Xt3cHj2/7pLUh8DQ/Ny3NeAb8N2323u70NgaxFQbC07n4MJgct7pnJ+fd9qcgymuCgyy1jRRlpuEMQYbYuOBqo3nZyojdK2vozRcn+V9u33pZDKJuVLzaJAtiA5SdpNBzirUBBYhlYvaXIDuFNZwQLXhN3pkoK/C4hEVMg/X7IBb3onlHnidDwZFKMnxZbQAt1FOSAGyASiLtI7W9g7YLCb2BUpg588/exiQcVxpNMYky+jtu+vqTfsGBgZE01jzJhM2CWt+cHAwaZPYvGtcMrnGyScaBdDWhKRpQsi0hxikKYC0bMWHO2TLQEk46xa5PlleyWT+8Mc//Xldzke7PcU/fLixjWxi0LsgYjkTG2vvrq5ko39JypUjCmMyJdm/CAaboYmnobXB4rAXXfXh89nYMe6Is9XAAAYZzo2Pj//X548ePfrjX9JyCHcDaWweG9y8FKG77/z58ePE1l9zuczKJ16x34iAURQTPpSRAcBZlqLihHJRGwx4ywoCEwaEi6N3pW6NnRfB8Mr709umJ48fPfrDihS03rsYzGbb5ubF+OyGE48fexZNC5+hn/2nrQiGE9S2sAY5C1dSRBcY7DVRRWVFC8lSaSGDfYUW7TufL44Jf3v0xvhMWoqYIILhiGGulSd7j1GyjT9dQK/SpQCTBx/+GtANFqUjFaF1h2nMmlK5oJSKdpNpZOdPnKfb98WOaXFGXLtsBvrwbssaGkk277MZ02d7f8NRefz3iOm5TQ0mhs3mZZzLLIvQEa7HFE0fBrZUYLM+uxSy5ztfCN3dnkc76IeeYP8Y8OBNCe8DLuG1OZHfPd+7h8Ge/l0KmM2bwsjK6j/FOHxUEmGrXTMTYQUVqoEDW6pZK8VJS8s505c7//B0f7HzKfqhOfSN9cCmCJbkNmy2Y/iv7j1FIbu394nJJXFISaoAS8CqYOIeoCYY0O1Nt9QRw94nfTb3fGfn0Rs7XyITiuP/IxVAJnIM/b7Y7702ZC+f7e093dtbiLhkEI5zqlehqRvAX4Lg95pgsEoRgVk3VWBbJdCvRj798tPbkUhc/P66MGsXwVAubuNf2/VV5PlfF56lvyqu0cRQqsACUDBCe0ATDHqr9i0Pr0rFPt+sArS0gu7jBez6XU4xMneklOvqUrbjEnjwKeWErltIE1mdYEJaPcis6xXFIq6pBjybdhkMl/d3bGoGXIdwXFL9nbuwBpyJOJFpgkFvKb3l8dxXgaSF2coy2L7l9qzZi2C4N8VtzHsr0NZQDakG24aDwccY+2xHCYy39qmic9+qIuvtXX/os6bsZTCRjLujRMPNU6kiKX9rELyEJi1ctMCAqzGxM+DbVEco5QvcT7vsYjHiWt91W33u4pQggdm883gRvX03KdtgMsFxFZMYrr3gYJpcmmCQnUxRuJcTqBhVu4LHOpDa3NxMzfqsPh8vNzzKYLjtsS01OzbW1sROwXZSuegUvUQHmPaKrG4wXuizf/21IvvSmwEBI/l8gjW17lK030ozlVcKU7GZ80DhJt5vvpGyFdimMpGWmlpgwPUzKqnEmwj4b/f3FWQoC9PrW0jrfXZVz7RLMQWjtbNzcOFB4sHCoNpJvuvo+G+Ri3Weu6FgY+KhdH5/f//bhxUeX9kGrgCT4bxetT96F37v6LgiBRJaBOsAA6fiRxLYe/v731eUw1qqBNMS90NHx48SGKwVrA8M6oqrPulGOCS32ve1wVhkqMYvC7oe02EeYLtftcq3b/Pt7fIsTAOzMcAk0ygKuILWY/fgCXrZqrh/W2AlIwvMO6/qfAN7HnomaHBJNSMo70zn0gwwVipuq8CAXSo9JRW4CBaP9JVvUudddDAdA4yD7vyhhayOIjgOfM1hFVi7L1UHGFqqqQXsBOtatkAXmuOqVGxvt27ShhkVTG0cWLDePXFbQhMM2hpY5Hk1WWCXQkYDk7ZhagLT0RrohDZz8DGPCjKKNVLANLiA+2PEHTJNMGj7TdzRZJK5XD9hubpsl14gXbp0CcAFLu5J++taYDqrYLW4KrJ/Pv/l5UtE9jOi+vnnn355CeGqt7ivr8UtF4ssspfSD0ek5HpZGbBq38AC18C6dlugM/SKUA1W7SCuV7+U/sbzn19UclX6vCRw4aFrUwLq9+oZuihhs3KUvXr18pfnz1FKvvj1RUXXxpbS5ALPz6RNaG0wqN8PW7XA2n1rlb2qn169evXi119/fVGRh975NW0u8PxMustFEwy83SLeE6chj+eTyoHmcjlhdigLOo2RDmNqgsGXmpcrJzJZPLfLnse8tgSRC3asz6Rzc93cCe8Fa4OhgbaW7qWDFQ+zaAraLiWeC9YGA7vHqobfF9NR2LX3ksGo4YK7PfGUGCFi0NpjRsvvi+lo5ddJYF7K6BIFXY0R77AlgEFrj2GODIZWaFwqrQXm9SZJZlgU1O11HhKDrzWpYDgfU6WhVj6vmCTMXQoBS2Dy0XsSGHQm2yDYYhkt0O2qAGNkoSjg5ckP8yOAgW4dwxoju0dRgT6Xy1UCczqdADBoCUy+pYAEBi0Xl7VrD6WEPumc3zGnLABYnadXaGBAw9euFusGA54Qo9wqQQKDVlWLPu2iqk4wYEFFubmFBAbOxVss96gFDNgXIB91poEBfZHtHjWAAb2D9oBTIhh0jqbVHjWDAVeZtBtriWDQtumwwBpkNYDBFmPUJx6RwaD1Yjd9kPHu710VYJ//wAKDDTHqwy/IYHruliBj8fx7RyvALn1X3NsjCbZmoUxiDDBY33SFMEXzvNvtvvne/tG3vq6IWEdHxxUqGmx6pt97SgGDPPPCRCjwERX//XvfHhX1mwrs0jcdoq78/uP/EMBgpT39Bk0KGNTxNdyDb0eRKuktdcTe7CjriuZwA12W8TBrGhhwM7q6Hez+/qhKvynAigEroVVz3YBcNXK69ogBQ1bVNa3kkkeZCHZpvqODRQaaxVhPH6eCwe7KH6+og/lKLpnsmMj1ZiVYNRloFqNjscBgxqguF3l+vwrs6Fu/iWCXPq/CQvpdzQUqFJm349PBYHOZemsCTVya+vrYJed3WlwdHWp3hJw1opW/IDBQ+ZERVAHT5jp69D8JWJXJCFmLsZ+4xQADVYyL7W52wBAYiasiZIC1GOC5mCww0Cagsqpya4wwJphylEHqKcDzcphgEMtXLF34D0hcNDBlLi6zrwd5jhgTDOIfi+Wqyk3MRBpYxw96MpFe/YLBIN2P8t6E+9uawBQ1MftqjMd4QMEgyVgqPsieSAcrD7Is82KwdzwBgAH63ePFQpgyxKhg5UHGLDuATwqGgAH2AYu+qFFOgcA64J7IKH51gbGfz1rMRYp30MGKMxlzjQl9GCYIjD3MxuXNaIp30MF+AGYi+MHOMDB2ASLnYs1g/wvLRPijuIFgzOO08hytVdmDwGRbZCzF2LWvfjBWacXxDLcHgTFmZ6Bx6AEz9zDm6TGPAWA36NfQ83xxMBjLGsUnqPPttYJdAaxYdD0dGA7GIsOHMvnu+sCoF9D3CG4dYIxGAd7b5C/XBUa9OULnW4DoAaOT4ffLqBOMNonpfWsTXWB0MjSV1Qd2g8al97nA+sCoZJlAnWCU0zj6H3GvE4zqIG53fWDkV67hael6wWjz2bK1LlckWkdNb1+oGwzVIKTl2aJQ1zxGso65mt5EWT+YubOTdAZkzFcz2O/EDfX+Gh6UXhsYeRUzHHDXDkbYFDs5Wds7xdUEhixEu9i/5am5ur+p+YKRM7W+fURtYOaej+Nav8cTbv8tojrepOhHzXZivPb3KK8RjDSjZf6drP+gSfNdaOp5I7Wawcw9VzWDZpzqCFddYDqerVOTztb3/pL1gJl7zNDT3ro1Uu+bd9cFZu7suQY9PKxLc9dqNHmjwDAawfnrUGTpRP3vclovGC5EjEWLLHXWVmsYDYaGWs8FwxJy7kLPifqpDAITEzJuBFZ8qccgLoPAMNpV6FF9om5f6+k0G4NlHBhGqytsOFid5hNGDC+DwUS2jy/UxBa/8HEPfoy7QWloOJjEtjSiyyUjI0uISnw6vXFYxoOJbChwMLjICApVj/zIfUNcvpFgRbilCyNzRLzI3MiFpTKU2dA0bCCYDNdjvnpt6cLtkZF4fE5UPD4ycvvC0rWraPLrUb05grFYDQVT8FWo+u0eOo3magIYRAan4aEBawDXYQAzPg0PB1gjwnUYwBrEddBgjUnDgwdrVLgOGqyBXAcKZmhteHjAGhmugwRrMNdBgRm7RDk8YMZ1AA4XWKPT8KDAGh+uAwFrRrgOAqxJXE0Ha0oaYnU2U+YTjmap7Y2mqomZ8W//omqz/IuqBfa6iQoWCqm+kj9eD8lgefQRu17+XJS/UPDHSl9Z8iFLrJC3vCaSwEKFwpA/6/f7LUN+Lns95PcPhfzcClI0zE1wnCXEcbEcx+WzrxmYJZb1x6LRcJRDH9FwLByO5sOFXIHjoouFcC4Xy+dy+Uwe/bfJYCFl8oc0R0KoNEZCyqEjg/nDlkI06o9GEUs2lLVw6LOJfG4cU+a4wkwmz8UWc0PNHmJD0Ylo6Lo/FsuHYiFLNJq/bkFfFdB/LDHxf9cthWyhkM3ns4WsBUUDxSOvAkO5mC2EC4VoPuTPhsITfvTDoQkulIuG8xkun8lNTMTGc7Gme0ce/cuuFKIFlEfRLPq8kMWfrMQs2QL6OrsSzhek74dRXArox3B4lGCW0Er0ejYUi4WRQaAXsiDIUDiaxemXi2ai4Uw0n8vnJpoNNpHJY65CFv/qhexKIZxFsQmLEUIBDIcLsQIaOYXsTB7RZ6M4PBVg0Vgolo3ij4kCV8ji6KN/gCF/IR8KFyYmUEqiAdh860BJkvfnUdLlLddj+Yl8LIY+Qug/eeze+Lf8AP0x5Ec/gDLWj352yKICE0ffEPqmf8gyZAmJ1CH0Of6+H30MIcO0DDWdq3b9/6w8Xme1wF43/R+Fu+IcbZqegQAAAABJRU5ErkJggg==",
  },
  {
    id: 3,
    name: "User 3",
    avatar:
      "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  },
  {
    id: 1,
    name: "User 1",
    avatar:
      "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
  },
];

const GradientCircles = () => {
  const minX = -100;
  const maxX = 350;
  const minY = -150;
  const maxY = 310;
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: {
    target: { files: React.SetStateAction<null>[] };
  }) => {
    setSelectedFile(event.target.files[0]);
    setLoading(true);

    // Simulating file upload delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="flex relative justify-center items-center h-screen">
      <div className="w-[640px] h-[640px] rounded-full bg-[#CCEAEC] flex justify-center items-center">
        <div className="w-[580px] h-[580px] rounded-full bg-[#4dbed1] flex justify-center items-center">
          <div className="w-[380px] h-[380px] z-[1] rounded-full bg-[#04a9bd] flex justify-center items-center">
            <div className="w-[190px] h-[190px] z-[2] rounded-full bg-[#038fa9] flex justify-center items-center">
              <div
                className="absolute z-10"
                style={{ position: "relative", width: "100%", height: "100%" }}
              >
                {users.map((user, index) => {
                  const offset = Math.floor(Math.random() * (maxY - minY + 1));
                  const x =
                    Math.floor(Math.random() * (maxX - minX + 1)) + minX;
                  const y = minY + offset;
                  return (
                    <div
                      key={index}
                      className="absolute animate-float"
                      style={{
                        top: y,
                        left: x,
                        transform: "translate(-50%, -50%)",
                        zIndex: index + 1,
                      }}
                    >
                      <Avatar src={user.avatar} />
                    </div>
                  );
                })}
                <div className="flex justify-center mt-16">
                  <svg
                    width="60px"
                    height="60px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6.94975C2 6.06722 2 5.62595 2.06935 5.25839C2.37464 3.64031 3.64031 2.37464 5.25839 2.06935C5.62595 2 6.06722 2 6.94975 2C7.33642 2 7.52976 2 7.71557 2.01738C8.51665 2.09229 9.27652 2.40704 9.89594 2.92051C10.0396 3.03961 10.1763 3.17633 10.4497 3.44975L11 4C11.8158 4.81578 12.2237 5.22367 12.7121 5.49543C12.9804 5.64471 13.2651 5.7626 13.5604 5.84678C14.0979 6 14.6747 6 15.8284 6H16.2021C18.8345 6 20.1506 6 21.0062 6.76946C21.0849 6.84024 21.1598 6.91514 21.2305 6.99383C22 7.84935 22 9.16554 22 11.7979V14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14V6.94975Z"
                      fill="#ffff"
                    />
                    <path
                      d="M20 6.23751C19.9992 5.94016 19.9949 5.76263 19.9746 5.60842C19.7974 4.26222 18.7381 3.2029 17.3919 3.02567C17.1969 3 16.9647 3 16.5003 3H9.98828C10.1042 3.10392 10.2347 3.23445 10.45 3.44975L11.0003 4C11.8161 4.81578 12.2239 5.22367 12.7124 5.49543C12.9807 5.64471 13.2653 5.7626 13.5606 5.84678C14.0982 6 14.675 6 15.8287 6H16.2024C17.9814 6 19.1593 6 20 6.23751Z"
                      fill="#ffff"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.25 10C12.25 9.58579 12.5858 9.25 13 9.25H18C18.4142 9.25 18.75 9.58579 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z"
                      fill="#ffff"
                    />
                  </svg>
                </div>
                {loading ? (
                  <div className="flex justify-center items-center text-white font-bold text-3xl">
                    Uploading...
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <label htmlFor="fileInput" className="fileInputLabel">
                      Upload File
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      onChange={handleFileUpload}
                      className="fileInput"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientCircles;
