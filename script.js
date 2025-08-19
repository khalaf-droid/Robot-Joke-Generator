const chat = document.getElementById("_chat");            // بمسك الكونتينر/الديف اللي هيظهر فيه الرسائل (الشات)
const jokeBtn = document.getElementById("jokeBtn");       // بمسك زرار "هات نكتة"

generateJoke();                                           // أول ما الصفحة تفتح، روح هات نكتة تلقائيًا

jokeBtn.addEventListener("click", generateJoke);          // لما المستخدم يدوس على الزرار، شغّل دالة جلب النكتة

async function generateJoke(){                             // دالة غير متزامنة عشان هنستنى رد من API

    jokeBtn.disabled = true;                               // اقفل الزرار مؤقتًا عشان مايحصلش ضغط نقرات وهو بيحمّل

    const message = createMessageElement("Hey Robot tell me a joke?"); // اعمل عنصر رسالة يوضح إننا طلبنا نكتة
    appendMessage(message);                                // ضيف رسالة الطلب في الشات

    const joke = createMessageElement();                   // اعمل عنصر رسالة فاضي للنكتة اللي جاية
    setElementContent(joke,'<i class="fa-solid fa-ellipsis"></i>'); // حط آيكون تحميل (3 نقاط) لحد ما الرد ييجي
    appendMessage(joke);                                   // ضيف رسالة "جاري التحميل" في الشات

    const res = await fetch("https://icanhazdadjoke.com", { // اطلب نكتة من الـ API
        headers:{                                          // هيدر الطلب
            Accept:"application/json",                     // بنقول للسيرفر: رجّعلي الرد بصيغة JSON
        },
    });

    if(res.ok){                                            // لو الطلب ناجح (status 200-299)
        const data = await res.json();                     // حوّل الجسم بتاع الرد لكائن JSON
        console.log(data);                                 // اطبعه في الكونسول (مفيد للدباگ)
        setElementContent(joke, data.joke);                // حط نص النكتة جوه نفس عنصر الرسالة اللي كان فيه التحميل
        jokeBtn.disabled = false;                          // افتح الزرار تاني عشان نقدر نجيب نكتة جديدة
    }                                                      // مفيش else: لو فشل الطلب، الزرار هيفضل مقفول (مذكور تحت في الملاحظات)

}

function createMessageElement(content){                    // دالة بتكوّن عنصر رسالة بالشكل المناسب
    const element = document.createElement("div");         // أنشئ <div> جديدة
    element.classList.add("message");                      // ضيف لها كلاس أساسي "message" (للاستايلينج)
    if(content){                                           // لو فيه محتوى ابتدائي
        element.classList.add("response");                 // اعتبرها رسالة رد/نص جاهز
        setElementContent(element, content);               // وحط المحتوى جواها
    }else{                                                 // لو مفيش محتوى (هنملأه بعدين)
        element.classList.add("joke");                     // اعتبرها رسالة نكتة/placeholder
    }

    return element;                                        // رجّع العنصر اللي اتكوّن
}

function setElementContent(element, content){              // دالة مساعدة لتحط محتوى جوا عنصر
  element.innerHTML = content;                             // بتحط المحتوى كـ HTML (مش نص عادي)
}

function appendMessage(element){                           // دالة تضيف الرسالة لآخر الشات
   chat.appendChild(element);                              // حط العنصر جوا كونتينر الشات
}
