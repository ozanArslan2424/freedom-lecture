"use client";
import { StepBackIcon, StepForwardIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const LECTURE_CONTENT = [
  {
    id: 1,
    content:
      "Davranış özgürlüğü, bir kişinin kendi davranışlarını seçme ve uygulama yeteneğidir. Bu, bir kişinin kendi kararlarını verme ve uygulama yeteneği anlamına gelir.",
  },
  {
    id: 2,
    content:
      "Ancak özgürlüğümüzü belirleyen farklı faktörler vardır. Bunlar arasında genetik, çevresel ve sosyal faktörler bulunur. Bu faktörler, bir kişinin davranışlarını etkileyebilir ve sınırlayabilir.",
  },
  {
    id: 3,
    content:
      "Sınırlanmamış özgürlük kulağa hoş geliyor olabilir. Genetikten, çevreden ve sosyal faktörlerden bağımsız olarak davranışlarımızı seçebilmek harika olurdu. ",
  },
  {
    id: 4,
    content:
      "Böyle bir özgürlüğün neye benzediğini görmek için yukarıdaki karakteri ok tuşlarını kullanarak hareket ettirin. Hevesinizi aldığınızda bir sonraki adıma geçebiliriz.",
  },
  {
    id: 5,
    content:
      "Karakterinizin sallandığını gördünüz mü? Fakat ne kadar hareket ettiğinizi anlamanız imkansız. İsterseniz arka planı açıp gerçekten hareket edip etmediğinizi kontrol edin.",
  },
  {
    id: 6,
    content:
      "Arka plandaki çemberler dünyamızı temsil ediyor. Bu çemberlerin sınırları, özgürlüğümüzü belirleyen faktörlerin sınırlarını temsil eder.",
  },
  {
    id: 7,
    content:
      "Sınırsız özgürlüğe sahip olan karakterinizin bir arka planı olsa da gerçek hayatta böyle bir tuş yok maalesef. Gerçek hayatta bunun yerine sınırlarımız vardır. Bu sınırlar doğuştan da gelebilir, kendimiz de oluşturabiliriz. Karakterinize bir sınır belirleyin ve tekrar hareket etmeyi deneyin.",
  },
  {
    id: 8,
    content:
      "Artık bir arka plana ihtiyacınız yok. Ne tarafa ne kadar ilerleyebileceğinizi biliyorsunuz. Daha fazlasını deneseniz bile yapamıyorsunuz. Yeni bir sınır belirleyin, bu sefer daha büyük olsun.",
  },
];

export const Lecture = () => {
  const [currentId, setCurrentId] = useState(1);

  return (
    <div className="lecture-grid items-center gap-2 absolute w-1/2 bottom-12 left-1/2 translate-x-[-50%]">
      {currentId >= 2 && (
        <Button
          size="big"
          variant="secondary"
          className="size-16 aspect-square back-btn"
          onClick={() => setCurrentId((id) => id - 1)}
        >
          <StepBackIcon size={24} />
        </Button>
      )}

      <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm h-max w-full lecture">
        <p className="text-lg">{LECTURE_CONTENT.find((content) => content.id === currentId)?.content}</p>
      </div>

      {currentId < LECTURE_CONTENT.length && (
        <Button
          size="big"
          variant="secondary"
          className="size-16 aspect-square next-btn"
          onClick={() => setCurrentId((id) => id + 1)}
        >
          <StepForwardIcon size={24} />
        </Button>
      )}
    </div>
  );
};
