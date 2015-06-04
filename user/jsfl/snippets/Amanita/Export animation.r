rebol []

do %/d/rs/rs.r
rs/run/version 'stream-io 'write

anim-spec: [
	Images [
		%Bitmaps/Mloci/MlociMain/SopranNoha3B
		%Bitmaps/Mloci/MlociMain/SopranNoha3A
	]
	Symbol %test [
		objects [
			%Bitmaps/Mloci/MlociMain/SopranNoha3A 135 23.95 0
			%Bitmaps/Mloci/MlociMain/SopranNoha3B 135 29 0
		]
		show 1 frames
		objects [
			%Bitmaps/Mloci/MlociMain/SopranNoha3A 135.05 23.9 0.047210693359375
			%Bitmaps/Mloci/MlociMain/SopranNoha3B 135 28.95 0.1844635009765625
		]
		show 1 frames
		objects [
			%Bitmaps/Mloci/MlociMain/SopranNoha3A 135.2 23.8 0.1897125244140625
			%Bitmaps/Mloci/MlociMain/SopranNoha3B 135.15 28.85 0.7404632568359375
		]
		show 1 frames
	]
]

parse-timeline: func[data /local objects newobjects num n][
	objects: copy []
	parse data [any [
		'objects set newobjects block! (
			n: 0
			objects: head objects
			foreach [id x y r] newobjects [
				n: n + 1
				oldid: pick objects 1
				either oldid [
					either oldid = id [
						print [tab "move" id x y r "depth" n]
					][
						print [tab "remove" id]
						print [tab "place" id x y r "depth" n]
						change objects id 
					]
				][
					print [tab "place" id x y r "depth" n]
					insert objects id 
				]
				objects: next objects
			]
			while [not tail? objects] [
				print [tab "remove" objects/1]
				objects: remove objects
			]
		) |
		'show set num integer! 'frames (
			loop num [print "showFrame"] 
		)
		|
		'showFrame (print "showFrame" )
	]]
]
parse anim-spec [
	any [
		'Images set images block! (
			probe images
		)
		|
		'Symbol copy name file! set data block! (
			print ["======" name]
			parse-timeline data
		)
	]
]

halt
