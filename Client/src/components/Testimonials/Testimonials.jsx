import React from "react";
import { Carousel } from "react-responsive-carousel";

const Testimonials = () => {
  return (
    <div>
      <div class="min-w-screen min-h-screen flex items-center justify-center py-5">
        <div class="w-full border-t border-b border-gray-200 px-5 py-16 md:py-24 text-gray-400">
          <div class="w-full max-w-6xl mx-auto">
            <div class="text-center max-w-xl mx-auto">
              <h1 class="text-6xl md:text-7xl font-bold mb-5 text-gray-200">
                What people <br />
                are saying.
              </h1>
              <h3 class="text-xl mb-5 font-light">
                This contains the Testimonials for Brajsundar Das by others.
              </h3>
            </div>

            <div class="-mx-3 md:flex items-start">
              <div class="px-3 md:w-1/3">
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img
                        src="Bhakti-Prabhava-Swami.jpg"
                        alt="Bhakti-Prabhava-Swami"
                      />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Bhakti Prabhava Swami .
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Besides his administrative services, his greatest
                      contribution to Srila Prabhupada’s movement has been his
                      travelling all over the world for promoting the hearing,
                      chanting and discussing of the Srimad Bhagavatam. This in
                      pursuance of Srila Prabhupada’s mission and the
                      instructions of His Holiness Radha Govinda Maharaja and
                      his godbrother the late His Holiness Gaura Krishna Das
                      Goswami.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img
                        src="Govardhan-das.jpg"
                        alt="Govardhan-das"
                        className="object-fill h-full"
                      />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        {" "}
                        Govardhana Das.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Brajsunder Prabhu is an evangelist for the teaching and
                      spreading the sacred message of Srimad Bhagavatam. He such
                      a glorious devotee doing such glorious service. May
                      Krishna grant him all success with the Bhagavata
                      Mahavidyalaya project.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="px-3 md:w-1/3">
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img
                        src="Gauranga-Das.jpg"
                        alt="Gauranga-Das"
                        className="object-fill h-full"
                      />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Gauranga Das.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      His Grace Brajsundar prabhu has been spearheading the
                      mission of systematic study of Srimad Bhagavatam for
                      several years and has facilitated the home study of the
                      Srimad Bhagavatam for many grihasthas. The recent
                      initiative of ISKCON Bhagavata Mahavidyalaya is a much
                      needed initiative and his determination and dedication for
                      this purpose has been a major force to make this happen. I
                      wish him well in his efforts.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img
                        src="Srivas-Das.jpg"
                        alt="Srivas-Das"
                        className="object-contain h-full"
                      />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Srivas Das.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Over the years Brajsunder Prabhu has also, from scratch
                      and single-handedly started the Bhagavata Mahavidyalaya
                      program, traveling to many countries distributing the
                      knowledge of Srimad Bhagavatam to many. This effort has
                      culminated into an institute and accredited to function as
                      a university for awarding academic degrees in the study of
                      Shastra and Sanskrit. This institute, functioning as
                      non-profit, is offering free tuition, boarding and lodging
                      for interested students from around the world. During this
                      global Covid – 19 pandemic lock-down in India, I have
                      witnessed his daily tireless efforts and at great risk, in
                      providing meals for the hungry saints, impoverished
                      residents and estranged animals in Vrindavan. These
                      activities speak volumes of the character of Brajsunder
                      Prabhu. He is a selfless, hardworking and dedicated
                      individual, who has a sweet and welcoming disposition to
                      everyone who crosses his way. I will not hesitate to
                      recommend him as a reliable fellow, to anybody or
                      organization who needs his services.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="px-3 md:w-1/3">
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img
                        src="Svayam-Bhagavan-Keshav-Swami.jpg"
                        alt="Svayam-Bhagavan-Keshav-Swami"
                      />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Svayam Bhagavan Keshava Swami.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Brajsunder Prabhu relishes Srimad-Bhagavatam and helps
                      others do the same. His enthusiasm, dedication and
                      dynamism in bringing Srila Prabhupada’s books to the
                      forefront is truly inspiring. He is busily engaged in
                      lecturing, creating study materials, pioneering Bhagavatam
                      schools and supporting ISKCON’s development in a variety
                      of ways. Brajsunder Prabhu is a busy Vaisnava who is
                      simultaneously going deep.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
                <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                  <div class="w-full flex mb-4 items-center">
                    <div class="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                      <img
                        src="Bhakti-Karunamayi-Vanamali-Swami.jpg"
                        alt="Bhakti-Karunamayi-Vanamali-Swami"
                        className="object-fill h-full"
                      />
                    </div>
                    <div class="flex-grow pl-3">
                      <h6 class="font-bold text-sm uppercase text-gray-600">
                        Bhakti Karunamayi Vanamali Swami.
                      </h6>
                    </div>
                  </div>
                  <div class="w-full">
                    <p class="text-sm leading-tight">
                      <span class="text-lg leading-none italic font-bold text-gray-400 mr-1">
                        "
                      </span>
                      Brajsunder Das joined as a very enthusiastic youth in
                      Mumbai. He received association of H.H. Gaur Krishna Das
                      Goswami and with his blessings he also received love of
                      Srimad Bhagavatam from him. I could say this has been very
                      blessings in his life. I see him as a person who is always
                      eager to help others at best of his capacity. He is an
                      intelligent person very quick in engaging everybody with
                      Krishna's Service. This makes him a very wonderful
                      devotee, and also a wonderful Manager. This is a very
                      wonderful combination of a Bhagavata Rasika and a Manager.
                      I see him as a bright leader, a Manager and a devotee.
                      <span class="text-lg leading-none italic font-bold text-gray-400 ml-1">
                        "
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
