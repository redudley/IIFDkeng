// 'preload' should be the first item in the shuffle sequence so that images are preloaded
// before any other items are displayed.

var shuffleSequence = seq(
                             "preload",
                             "time",
                             "taskdescrip",
                             "time",
                             "famknown",
                             "time",
                             "singleprem",
                             "time",
                              randomize("prac_single", "time"),
                             "doubleprem",
                             "time",
                              randomize("prac_double", "time"),
                             "time",
                             randomize("test","time")

                            );

var defaults = [
    "Separator", {
        transfer: 1000,
        normalMessage: "Please wait for the next sentence.",
        errorMessage: "Wrong. Please wait for the next sentence."
    },
    "NextMessage", {hideProgressBar: true,
    },
    "PracticeMessage", {hideProgressBar: true,
    },
    "StartMessage", {hideProgressBar: true,
    },
    "PictureAccept", {
      hideProgressBar: true,
      randomOrder: false
    },
    "Question", {
        hideProgressBar: true,
        hasCorrect: false,
        randomOrder: false
    },
    "FlashSentence", {
        hideProgressBar: true,
        timeout: 5000
    },
    "MyDashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "DashedSentence", {
        hideProgressBar: true,
        mode: "self-paced reading",
        display: "in place",
        hideUnderscores: false,
        blankText: "\u0020\u0020"
    },
    "Message", {
        hideProgressBar: true
    },
    "Form", {
        hideProgressBar: true,
        continueOnReturn: true,
        saveReactionTime: true
    },
    "MyTime", {
        hideProgressBar: true
    }
];

// ========== START OF CODE TO COPY INTO YOUR DATA FILE ==========
var IMAGES_TO_PRELOAD = [

    "https://imgur.com/CKEa3Zr.png", // 8-4c0s -   every-circle,                 conj & known conditions
    "https://imgur.com/EhOp8QM.png", // 8-0c3s -   three-square,                 conj & known conditions
    "https://imgur.com/d9htci3.png", // 8-4c3s -   every-circle / three-square,  conj condition

    "https://imgur.com/eQh40x2.png", // 8-2c3s -   every-circle,                 known & unknown conditions
    "https://imgur.com/zIUwK4N.png", // 8-4c2s -   three-square,                 known & unknown conditions

    "https://imgur.com/VAObTsD.png", // 8-0c4s -   every-square,                 conj & known conditions
    "https://imgur.com/mnzhSDj.png", // 8-3c0s -   three-circle,                 conj & known conditions
    "https://imgur.com/mKarxSv.png", // 8-3c4s -   every-square / three-circle,  conj condition

    "https://imgur.com/KduS46H.png", // 8-3c2s -   every-square,                 known & unknown conditions
    "https://imgur.com/M6bF0FW.png", // 8-2c4s -   three-circle,                 known & unknown conditions

    "https://imgur.com/szZ1mVE.png", // 8-1c2s-control
    "https://imgur.com/wkDVZgd.png", // 8-1c3s-control
    "https://imgur.com/zXTKjiQ.png", // 8-2c2s-control
    "https://imgur.com/yv9ULuj.png", // 8-4c4s-control


];

define_ibex_controller({
    name: "Preloader",
    jqueryWidget: {
        _init: function () {
            this.element.append("Loading images...");

            this.preloadedImages = [ ];
            var numToPreload = IMAGES_TO_PRELOAD.length;
            for (var i = 0; i < IMAGES_TO_PRELOAD.length; ++i) {
                var img = new Image();
                img.src = IMAGES_TO_PRELOAD[i];
                var self = this;
                img.onload = function () {
                    --numToPreload;
                    if (numToPreload == 0) {
                        self.options._finishedCallback([ ]);
                    }
                }
                this.preloadedImages.push(img);
            }
        }
    },
    properties: {
        countsForProgressBar: false
    }
});
// ========= END OF CODE TO COPY INTO YOUR DATA FILE ==========

var items = [

    // Define the 'preload' item.
    ["preload", "Preloader", { }],

    ["time", "MyTime", { }]

    ["sep", "Separator", { }],

    ["setcounter", "__SetCounter__", { }],

    ["taskdescrip","NextMessage", {html: {include: 'iifd_task.html'}}],

    ["famknown","NextMessage", {html: {include: 'iifd_known_sample.html'}}],

    ["singleprem","PracticeMessage", {html: {include: 'iifd_introduce_single.html'}}],

    ["doubleprem","PracticeMessage", {html: {include: 'iifd_introduce_double.html'}}],

    ["start","StartMessage", {html: {include: 'iifd_start.html'}}],

    ["prac_single", //every shape: choice between 4c4s (correct, left) and 2c2s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/wkDVZgd.png"], //4c4s - true
                                        ["K","https://imgur.com/zXTKjiQ.png"]]}],//2c2s - false
    ["prac_single", //three squares: choice between 1c3s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_three_squares.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s - true
    ["prac_double", //one or four circles, every shape: choice between 4c4s (correct, right) and 1c2s (wrong, left)
                "Message",        {html: {include: 'iifd_eng_practice_first_one_circles_four_circles.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_every_shape.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/szZ1mVE.png"], //1c2s - false
                                        ["K","https://imgur.com/wkDVZgd.png"]]}], //4c4s - true
    ["prac_double", //two or three squares, two circles : choice between 2c2s (correct, left) and 1c3s (wrong, right)
                "Message",        {html: {include: 'iifd_eng_practice_first_two_squares_three_squares.html'}},
                "Message",        {html: {include: 'iifd_eng_practice_second_two_circles.html'}},
                "PictureAccept",  {s: "Which one is it?",
                                  as:   [["D","https://imgur.com/zXTKjiQ.png"], //2c2s - true
                                        ["K","https://imgur.com/yv9ULuj.png"]]}], //1c3s- false


      // item names: #-premiseorder-P1-disjunctorder-P2-Ashape-imageset-Afallaciousimageside


      [["test", 1],   //1001-canonical-disj-Afirst-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 1],   //1002-canonical-disj-Bfirst-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 1],   //1003-canonical-disj-Afirst-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 1],   //1004-canonical-disj-Bfirst-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 2],   //1005-canonical-disj-Afirst-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 2],   //1006-canonical-disj-Bfirst-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 2],   //1007-canonical-disj-Afirst-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 2],   //1008-canonical-disj-Bfirst-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 3],   //1009-canonical-disj-Afirst-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 3],   //1010-canonical-disj-Bfirst-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 3],   //1011-canonical-disj-Afirst-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 3],   //1012-canonical-disj-Bfirst-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 4],   //1013-canonical-disj-Afirst-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 4],   //1014-canonical-disj-Bfirst-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 4],   //1015-canonical-disj-Afirst-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 4],   //1016-canonical-disj-Bfirst-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 5],   //1017-canonical-disj-Afirst-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 5],   //1018-canonical-disj-Bfirst-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 5],   //1019-canonical-disj-Afirst-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 5],   //1020-canonical-disj-Bfirst-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 6],   //1021-canonical-disj-Afirst-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 6],   //1022-canonical-disj-Bfirst-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 6],   //1023-canonical-disj-Afirst-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 6],   //1024-canonical-disj-Bfirst-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 7],   //1025-canonical-disj-Afirst-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 7],   //1026-canonical-disj-Bfirst-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 7],   //1027-canonical-disj-Afirst-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 7],   //1028-canonical-disj-Bfirst-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 8],   //1029-canonical-disj-Afirst-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 8],   //1030-canonical-disj-Bfirst-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 8],   //1031-canonical-disj-Afirst-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 8],   //1032-canonical-disj-Bfirst-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 9],   //1033-canonical-disj-Afirst-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 9],   //1034-canonical-disj-Bfirst-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 9],   //1035-canonical-disj-Afirst-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 9],   //1036-canonical-disj-Bfirst-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 10],   //1037-canonical-disj-Afirst-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 10],   //1038-canonical-disj-Bfirst-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 10],   //1039-canonical-disj-Afirst-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 10],   //1040-canonical-disj-Bfirst-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 11],   //1041-canonical-disj-Afirst-someA-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 11],   //1042-canonical-disj-Bfirst-someA-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 11],   //1043-canonical-disj-Afirst-someA-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 11],   //1044-canonical-disj-Bfirst-someA-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 12],   //1045-canonical-disj-Afirst-someA-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 12],   //1046-canonical-disj-Bfirst-someA-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 12],   //1047-canonical-disj-Afirst-someA-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 12],   //1048-canonical-disj-Bfirst-someA-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 13],   //1049-canonical-disj-Afirst-someA-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 13],   //1050-canonical-disj-Bfirst-someA-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 13],   //1051-canonical-disj-Afirst-someA-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 13],   //1052-canonical-disj-Bfirst-someA-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 14],   //1053-canonical-disj-Afirst-someA-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 14],   //1054-canonical-disj-Bfirst-someA-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 14],   //1055-canonical-disj-Afirst-someA-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 14],   //1056-canonical-disj-Bfirst-someA-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 15],   //1057-canonical-disj-Afirst-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 15],   //1058-canonical-disj-Bfirst-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 15],   //1059-canonical-disj-Afirst-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 15],   //1060-canonical-disj-Bfirst-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 16],   //1061-canonical-disj-Afirst-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 16],   //1062-canonical-disj-Bfirst-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 16],   //1063-canonical-disj-Afirst-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 16],   //1064-canonical-disj-Bfirst-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 17],   //1065-canonical-disj-Afirst-someA-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 17],   //1066-canonical-disj-Bfirst-someA-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 17],   //1067-canonical-disj-Afirst-someA-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 17],   //1068-canonical-disj-Bfirst-someA-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 18],   //1069-canonical-disj-Afirst-someA-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 18],   //1070-canonical-disj-Bfirst-someA-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 18],   //1071-canonical-disj-Afirst-someA-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 18],   //1072-canonical-disj-Bfirst-someA-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 19],   //1073-canonical-disj-Afirst-someA-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 19],   //1074-canonical-disj-Bfirst-someA-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 19],   //1075-canonical-disj-Afirst-someA-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 19],   //1076-canonical-disj-Bfirst-someA-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 20],   //1077-canonical-disj-Afirst-someA-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 20],   //1078-canonical-disj-Bfirst-someA-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 20],   //1079-canonical-disj-Afirst-someA-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 20],   //1080-canonical-disj-Bfirst-someA-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "Message",        {html: {include: 'iifd_eng_second_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 21],   //1081-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 21],   //1082-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 21],   //1083-onlyP1-disj-Afirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 21],   //1084-onlyP1-disj-Bfirst-noP2-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 22],   //1085-onlyP1-disj-Afirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 22],   //1086-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 22],   //1087-onlyP1-disj-Afirst-noP2-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 22],   //1088-onlyP1-disj-Bfirst-noP2-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 23],   //1089-onlyP1-disj-Afirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 23],   //1090-onlyP1-disj-Bfirst-noP2-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 23],   //1091-onlyP1-disj-Afirst-noP2-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 23],   //1092-onlyP1-disj-Bfirst-noP2-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 24],   //1093-onlyP1-disj-Afirst-noP2-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 24],   //1094-onlyP1-disj-Bfirst-noP2-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 24],   //1095-onlyP1-disj-Afirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 24],   //1096-onlyP1-disj-Bfirst-noP2-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 25],   //1097-onlyP1-disj-Afirst-noP2-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 25],   //1098-onlyP1-disj-Bfirst-noP2-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 25],   //1099-onlyP1-disj-Afirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 25],   //1100-onlyP1-disj-Bfirst-noP2-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 26],   //1101-onlyP1-disj-Afirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 26],   //1102-onlyP1-disj-Bfirst-noP2-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 26],   //1103-onlyP1-disj-Afirst-noP2-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 26],   //1104-onlyP1-disj-Bfirst-noP2-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 27],   //1105-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 27],   //1106-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 27],   //1107-onlyP1-disj-Afirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 27],   //1108-onlyP1-disj-Bfirst-noP2-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 28],   //1109-onlyP1-disj-Afirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 28],   //1110-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 28],   //1111-onlyP1-disj-Afirst-noP2-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 28],   //1112-onlyP1-disj-Bfirst-noP2-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 29],   //1113-onlyP1-disj-Afirst-noP2-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 29],   //1114-onlyP1-disj-Bfirst-noP2-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 29],   //1115-onlyP1-disj-Afirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_circle_three_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 29],   //1116-onlyP1-disj-Bfirst-noP2-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_squares_every_circle.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 30],   //1117-onlyP1-disj-Afirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 30],   //1118-onlyP1-disj-Bfirst-noP2-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 30],   //1119-onlyP1-disj-Afirst-noP2-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_every_square_three_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 30],   //1120-onlyP1-disj-Bfirst-noP2-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_three_circles_every_square.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 31],   //1121-onlyP2-noP1-na-someB-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 31],   //1122-onlyP2-noP1-na-someB-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 32],   //1123-onlyP2-noP1-na-someB-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 32],   //1124-onlyP2-noP1-na-someB-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 33],   //1125-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 33],   //1126-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 34],   //1127-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 34],   //1128-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 35],   //1129-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 35],   //1130-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 36],   //1131-onlyP2-noP1-na-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 36],   //1132-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 37],   //1133-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 37],   //1134-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 38],   //1135-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 38],   //1136-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 39],   //1137-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 39],   //1138-onlyP2-noP1-na-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 40],   //1139-onlyP2-noP1-na-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 40],   //1140-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 41],   //1141-onlyP2-noP1-na-someA-circle-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 41],   //1142-onlyP2-noP1-na-someA-circle-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 42],   //1143-onlyP2-noP1-na-someA-square-mixedAB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 42],   //1144-onlyP2-noP1-na-someA-square-mixedAB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
      [["test", 43],   //1145-onlyP2-noP1-na-someB-circle-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 43],   //1146-onlyP2-noP1-na-someB-circle-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 44],   //1147-onlyP2-noP1-na-someB-square-conjunctiveB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 44],   //1148-onlyP2-noP1-na-someB-square-conjunctiveB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 45],   //1149-onlyP2-noP1-na-someB-circle-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/zIUwK4N.png"], //4c2s
                                          ["K","https://imgur.com/EhOp8QM.png"]]}], //0c3s
      [["test", 45],   //1150-onlyP2-noP1-na-someB-circle-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/EhOp8QM.png"], //0c3s
                                          ["K","https://imgur.com/zIUwK4N.png"]]}], //4c2s
      [["test", 46],   //1151-onlyP2-noP1-na-someB-square-knownB-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/M6bF0FW.png"], //2c4s
                                          ["K","https://imgur.com/mnzhSDj.png"]]}], //3c0s
      [["test", 46],   //1152-onlyP2-noP1-na-someB-square-knownB-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mnzhSDj.png"], //3c0s
                                          ["K","https://imgur.com/M6bF0FW.png"]]}], //2c4s
      [["test", 47],   //1153-onlyP2-noP1-na-someB-circle-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/d9htci3.png"], //4c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 47],   //1154-onlyP2-noP1-na-someB-circle-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/d9htci3.png"]]}], //4c3s
      [["test", 48],   //1155-onlyP2-noP1-na-someB-square-conjunctiveA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/mKarxSv.png"], //3c4s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 48],   //1156-onlyP2-noP1-na-someB-square-conjunctiveA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/mKarxSv.png"]]}], //3c4s
      [["test", 49],   //1157-onlyP2-noP1-na-someB-circle-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/eQh40x2.png"], //2c3s
                                          ["K","https://imgur.com/CKEa3Zr.png"]]}], //4c0s
      [["test", 49],   //1158-onlyP2-noP1-na-someB-circle-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_circles.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/CKEa3Zr.png"], //4c0s
                                          ["K","https://imgur.com/eQh40x2.png"]]}], //2c3s
      [["test", 50],   //1159-onlyP2-noP1-na-someB-square-knownA-right
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/KduS46H.png"], //3c2s
                                          ["K","https://imgur.com/VAObTsD.png"]]}], //0c4s
      [["test", 50],   //1160-onlyP2-noP1-na-someB-square-knownA-left
                  "Message",        {html: {include: 'iifd_eng_first_sound_some_squares.html'}},
                  "PictureAccept",  {s: "Which one is it?",
                                    as:   [["D","https://imgur.com/VAObTsD.png"], //0c4s
                                          ["K","https://imgur.com/KduS46H.png"]]}], //3c2s
    
];
