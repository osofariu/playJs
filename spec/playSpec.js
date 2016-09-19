"use strict";

require('jasmine')

describe("classes can extend other classes", function () {

    class Shape {
        area() {
            return 0
        }
        circumference() {
            return 0
        }
    }

    class Circle extends Shape {
        constructor(radius) {
            super()
            this.radius = radius
        }
        area() {
            return Math.PI * this.radius * this.radius
        }
        circumference() {
            return 2 * Math.PI * this.radius
        }
    }

    class Rectangle extends Shape {
        constructor(x, y) {
            super()
            this.x = x
            this.y = y
        }

        area() {
            return this.x * this.y
        }

        circumference() {
            return 2 * this.x + 2 * this.y
        }
    }

    describe("a collection of shapes can use polymorphism to get specific implementations", function () {

        let shapes = [new Circle(10), new Rectangle(3, 4)]

        it("sums-up all the areas", function () {
            let totalArea = shapes.map(s => s.area()).reduce((acc, x) => acc + x, 0)
            expect(totalArea).toBeCloseTo(326.159, 3)
        })

        it("sums-up all the circumferences", function () {
            let circumference = shapes.map(s => s.circumference()).reduce((acc, x) => acc + x, 0)
            expect(circumference).toBeCloseTo(76.8317, 3)
        })
    })

    describe("I can enumerate properties of objects", function () {

        props(new Circle(12))
        props(new Rectangle(3, 4))
        props(new Shape())

        function props(object) {
            for (let property in object) {
                if (!object.hasOwnProperty(property)) {
                    console.log(`parent property: ${property}: ${object[property]}`)
                } else {
                    console.log(`object property: ${property}: ${object[property]}`)
                }
            }
        }

    })
})

describe("exploring classes and generators", function () {

    class Polygon {
        constructor(height, width) {
            this.height = height;
            this.width = width;
        }

        get area() {
            return this.calcArea();
        }

        calcArea() {
            return this.height * this.width;
        }
    }

    class PolygonGenerator {
        static * gen(max) {
            let i = 0
            while (i++ < max) {
                let x = parseInt(10 * Math.random())
                let y = parseInt(10 * Math.random())
                yield (new Polygon(x, y))
            }
        }
    }


    it("allows you to call a method to get the area", function () {
        const square = new Polygon(10, 10);
        let area = square.area
        expect(area).toBe(100)
        console.log(`area of a square 10x10 is: ${square.area}`)
    })

    it("gives you a handy generator", function () {
        let polygons = PolygonGenerator.gen(10)
        let i = 0
        let p
        while (p = polygons.next().value) {
            expect(p.area).toBe(p.height * p.width)
            console.log(`${i++} Polygon (${p.height} , ${p.width}) with area: ${p.area}`)
        }
    })
})