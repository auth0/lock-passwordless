import expect from 'expect.js';
import * as u from '../acceptance_test_utils';

describe(".username acceptance", function() {
  before(u.stubWebApis);
  after(u.restoreWebApis);

  describe("constructing a Lock", function() {
    before(function() {
      this.lock = u.constructLock();
    });

    it("doesn't render a thing", function() {
      expect(u.isRendered(this.lock)).to.not.be.ok();
    });
  });

  describe("opening a Lock", function() {
    before(function() {
      this.lock = u.constructLock();
    });

    after(function() {
      u.closeLock(this.lock);
    });

    it("doesn't open the Lock immediately", function() {
      u.openLock(this.lock, "guardian");

      expect(u.isRendered(this.lock)).to.be.ok();
      expect(u.isOpened(this.lock)).to.not.be.ok();
    });

    it("opens it after a few ms", function(done) {
      setTimeout(() => {
        expect(u.isOpened(this.lock)).to.be.ok();
        done();
      }, 17);
    });

    it("displays an empty input for the username", function() {
      expect(u.qInputValue(this.lock, "username")).to.be("");
    });
  });

  describe("entering an invalid username", function() {
    before(function() {
      this.lock = u.constructLock();
      u.openLock(this.lock, "guardian");
      u.fillInput(this.lock, "username", "invalid username");
    });

    after(function() {
      u.closeLock(this.lock);
    });

    it("doesn't mark the input as invalid", function() {
      expect(u.isInputInvalid(this.lock, "username")).to.not.be.ok();
    });

    describe("when attempting a submit", function() {
      before(function() {
        u.submit(this.lock);
      });

      it("marks the input as invalid", function() {
        expect(u.isInputInvalid(this.lock, "username")).to.be.ok();
      });

      it("doesn't perform any request", function() {
        expect(u.hasStartedPasswordless(false)).to.be.ok();
        expect(u.isInputInvalid(this.lock, "username")).to.be.ok();
        expect(u.isLoading(this.lock)).to.not.be.ok();
      });

      describe("when fixing the username", function() {
        before(function() {
          u.fillInput(this.lock, "username", "someone@auth0.com");
        });

        it("clears the input error", function() {
          expect(u.isInputInvalid(this.lock, "username")).to.not.be.ok();
        });

        describe("and entering an invalid username again", function() {
          before(function() {
            u.fillInput(this.lock, "username", "invalid username");
          });

          it("doesn't mark the input as invalid", function() {
            expect(u.isInputInvalid(this.lock, "username")).to.not.be.ok();
          });
        });
      });
    });
  });

  describe("successfully submitting a username", function() {
    before(function() {
      this.lock = u.constructLock();
      this.cb = u.openLock(this.lock, "guardian");
      u.fillInput(this.lock, "username", "someone");
      u.submit(this.lock);
    });

    after(function() {
      u.closeLock(this.lock);
    });

    it("starts the signin flow", function() {
      const params ={
        callbackURL: undefined,
        connection: "guardian",
        forceJSONP: undefined,
        login_hint: "someone",
        redirect: true,
        responseType: "token"
      };
      expect(u.hasSignedInWith(params)).to.be.ok();
    });
  });
});
